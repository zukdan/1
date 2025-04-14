set -e
apt update 
apt full-upgrade -y  

apt autoremove -y
apt clean
apt autoclean

read -p "Введите имя пользователя: " newuser
adduser "$newuser"
usermod -aG sudo "$newuser"

mkdir -p /home/"$newuser"/.ssh
chmod 700 /home/"$newuser"/.ssh
read -p "Введите содержимое вашего публичного (аутентификации по SSH-ключам) ключа для пользователя $newuser: " public_key

if [ -z "$public_key" ]; then
    echo "Ошибка: Пустой публичный ключ. Пропустим настройку SSH ключей."
else
    echo "$public_key" >> /home/"$newuser"/.ssh/authorized_keys
    chmod 600 /home/"$newuser"/.ssh/authorized_keys
    chown -R "$newuser":"$newuser" /home/"$newuser"/.ssh
    echo "Аутентификация по SSH ключам настроена."
fi

read -p "Введите новый порт SSH (по умолчанию 22): " ssh_port

if [ -z "$ssh_port" ]; then
  ssh_port=2222 
elif ! [[ "$ssh_port" =~ ^[0-9]+$ ]]; then
    echo "Ошибка: Некорректный порт.  Оставляем порт по умолчанию (22)."
    ssh_port=22
elif (( ssh_port < 1024 || ssh_port > 65535 )); then
    echo "Ошибка: Некорректный порт.  Оставляем порт по умолчанию (22)."
    ssh_port=22
fi
sed -i "s/^#*Port 22/Port $ssh_port/" /etc/ssh/sshd_config
systemctl restart sshd

sed -i 's/^#*PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
sed -i 's/^#*ChallengeResponseAuthentication.*/ChallengeResponseAuthentication no/' /etc/ssh/sshd_config
systemctl restart sshd

sed -i 's/^#*PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
systemctl restart sshd

sed -i "s/^#*ClientAliveInterval.*/ClientAliveInterval 300/" /etc/ssh/sshd_config
sed -i "s/^#*ClientAliveCountMax.*/ClientAliveCountMax 3/" /etc/ssh/sshd_config
sed -i "s/^#*MaxAuthTries.*/MaxAuthTries 3/" /etc/ssh/sshd_config
systemctl restart sshd

cat <<EOF > /etc/issue
#######################################################################
ПРЕДУПРЕЖДЕНИЕ: Несанкционированный доступ к этой системе запрещен. Все действия отслеживаются и регистрируются. Получая доступ к этой системе, вы соглашаетесь с настоящими условиями.
#######################################################################
EOF
sed -i 's/^Banner none/Banner \/etc\/issue/' /etc/ssh/sshd_config
systemctl restart sshd

apt install ufw -y
ufw default deny incoming
ufw default allow outgoing
ufw allow "$ssh_port"/tcp  
ufw allow 80/tcp  
ufw allow 443/tcp 
ufw enable
ufw status

apt install fail2ban -y
systemctl restart fail2ban

apt install unattended-upgrades -y

apt install htop iotop iftop -y
apt install net-tools curl wget nmap tcpdump -y
apt install lynis rkhunter chkrootkit -y

SYSCTL_CONF="/etc/sysctl.d/99-security.conf"
cat <<EOF > "$SYSCTL_CONF"
kernel.dmesg_restrict = 1
kernel.kptr_restrict = 2
net.core.bpf_jit_harden = 2
kernel.kexec_load_disabled = 1
user.max_user_namespaces = 0
kernel.unprivileged_bpf_disabled = 1
vm.unprivileged_userfaultfd = 0
dev.tty.ldisc_autoload = 0
kernel.perf_event_paranoid = 3
fs.protected_symlinks = 1
fs.protected_hardlinks = 1
fs.protected_fifos = 2
fs.protected_regular = 2
fs.suid_dumpable = 0
kernel.randomize_va_space = 2
kernel.yama.ptrace_scope = 3
vm.mmap_min_addr = 4096
net.ipv4.tcp_syncookies = 1
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.default.rp_filter = 1
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
EOF
sysctl --system

rkhunter --update  
rkhunter -c --all
chkrootkit

lynis audit system

echo "Скрипт завершен."
echo "Рекомендуется перезагрузить систему для применения всех изменений."

