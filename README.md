Отличный выбор! 🚀 Ubuntu 22.04 LTS (Jammy Jellyfish) — стабильная, поддерживаемая версия, идеально подходящая как для рабочих станций, так и для серверов. Но, как и любую систему, Ubuntu нужно настраивать для повышения безопасности — особенно если она подключена к интернету или используется для хранения конфиденциальных данных.

Вот пошаговое руководство по безопасной настройке Ubuntu 22.04 LTS 🛡️👇

🔐 1. Обновление системы
bash
Копировать
Редактировать
sudo apt update && sudo apt upgrade -y && sudo apt autoremove -y
Обновление закрывает известные уязвимости — делай это регулярно!

🔥 2. Включение и настройка файрвола (UFW)
bash
Копировать
Редактировать
sudo apt install ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw enable
Проверить статус:

bash
Копировать
Редактировать
sudo ufw status verbose
Если используешь SSH — обязательно разреши его ДО включения файрвола:

bash
Копировать
Редактировать
sudo ufw allow ssh
🧱 3. Установка и настройка Fail2Ban (защита от брутфорса)
bash
Копировать
Редактировать
sudo apt install fail2ban
sudo systemctl enable fail2ban --now
Создай локальный конфиг:

bash
Копировать
Редактировать
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
Можно изменить настройки, например:

ini
Копировать
Редактировать
[sshd]
enabled = true
maxretry = 5
bantime = 1h
🧩 4. Активация AppArmor
Ubuntu 22.04 уже идёт с AppArmor, но стоит убедиться, что он работает:

bash
Копировать
Редактировать
sudo aa-status
Если он не активен:

bash
Копировать
Редактировать
sudo systemctl enable apparmor --now
Можно принудительно включить профили:

bash
Копировать
Редактировать
sudo aa-enforce /etc/apparmor.d/*
🛡 5. Настройка автоматических обновлений безопасности
bash
Копировать
Редактировать
sudo apt install unattended-upgrades
sudo dpkg-reconfigure unattended-upgrades
Проверь настройки в /etc/apt/apt.conf.d/50unattended-upgrades

🔍 6. Удаление ненужных пакетов
Убери всё лишнее:

bash
Копировать
Редактировать
sudo apt autoremove --purge
Отключи и удали ненужные сервисы:

bash
Копировать
Редактировать
sudo systemctl disable avahi-daemon
sudo systemctl stop avahi-daemon
🧪 7. Проверка на руткиты
bash
Копировать
Редактировать
sudo apt install rkhunter chkrootkit
sudo rkhunter --update
sudo rkhunter --check
sudo chkrootkit
🔐 8. Шифрование диска и домашней директории
Если не зашифровал диск при установке — можно использовать LUKS или VeraCrypt, но это лучше делать при установке.

Для домашней директории:

bash
Копировать
Редактировать
sudo apt install ecryptfs-utils
ecryptfs-migrate-home -u $USER
⚠️ Сделай резервную копию перед этим!

👥 9. Надёжные пароли и блокировка экрана
Используй сложные пароли

Включи автоматическую блокировку:

Settings → Privacy → Screen Lock → включить блокировку

🔑 10. Настройка 2FA с Google Authenticator (опционально)
bash
Копировать
Редактировать
sudo apt install libpam-google-authenticator
google-authenticator
Добавь PAM-модуль:

bash
Копировать
Редактировать
sudo nano /etc/pam.d/gdm-password
Вставь строку:

swift
Копировать
Редактировать
auth required pam_google_authenticator.so
🧼 11. Удаление "шпионов" и телеметрии
Ubuntu отправляет некоторую телеметрию:

Отключи:

bash
Копировать
Редактировать
sudo apt purge popularity-contest apport whoopsie
🧠 12. Установи антивирус (если работаешь с Windows-файлами)
bash
Копировать
Редактировать
sudo apt install clamav clamtk
sudo freshclam
📋 Быстрый чеклист по безопасности
Настройка	Статус
Обновления и автозаплатки	✅
UFW (файрволл)	✅
Fail2Ban	✅
AppArmor	✅
Автоблокировка экрана	✅
Сложные пароли	✅
Шифрование /home или диска	✅ / ⚠️
Проверка на rootkits	✅
2FA	✅ / 💡
Удаление телеметрии	✅
🛠️ Хочешь автоматизировать?
Хочу, могу написать bash-скрипт, который всё это делает сам — установит, настроит, активирует 🔐
Хочешь? Или может ты планируешь использовать Ubuntu как сервер, рабочую станцию или просто для повседневного использования?
