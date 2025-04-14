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

Откройте терминал. Вы можете найти терминал, выполнив поиск в меню приложений или нажав Ctrl+Alt+T.

Используйте cat для просмотра содержимого файла:

bash

sudo cat /etc/apt/apt.conf.d/50unattended-upgrades
sudo: Эта команда запускает команду cat с правами администратора (root), необходимыми для доступа к файлу. Вам будет предложено ввести свой пароль.
cat: Эта команда выводит содержимое файла в терминал.
/etc/apt/apt.conf.d/50unattended-upgrades: Это путь к конфигурационному файлу автоматических обновлений.
Проанализируйте вывод. Просмотрите содержимое файла в терминале. Обратите внимание на важные разделы, описанные в предыдущем ответе, особенно:

Unattended-Upgrade::Origins-Pattern: Убедитесь, что включены репозитории безопасности Ubuntu (и, возможно, другие репозитории, которые вы хотите обновлять автоматически). Должны быть строки, подобные:

"origin=Ubuntu,codename=${distro_codename},label=Ubuntu-Security";
"origin=Ubuntu,codename=${distro_codename},label=Ubuntu";
(или аналогичные)
Unattended-Upgrade::Package-Blacklist: Проверьте, есть ли в списке пакеты, которые вы не хотите обновлять автоматически.
Unattended-Upgrade::Auto-Reboot: Проверьте, включена ли автоматическая перезагрузка.
Unattended-Upgrade::Mail: Проверьте, настроен ли адрес электронной почты для уведомлений.
Unattended-Upgrade::MailOnlyOnError: Проверьте, будет ли отправляться письмо только при ошибках.
Пример вывода (примерный, он может немного отличаться в вашей системе):


// Automatically upgrade packages from these origins:
APT::Periodic::Unattended-Upgrade "1";

Unattended-Upgrade::Origins-Pattern {
        "origin=Ubuntu,codename=${distro_codename},label=Ubuntu-Security";
        "origin=Ubuntu,codename=${distro_codename},label=Ubuntu";
        "origin=Ubuntu,codename=${distro_codename}-updates,label=Ubuntu";
        //"origin=Ubuntu,codename=${distro_codename}-proposed,label=Ubuntu-Proposed";
        //"origin=Ubuntu,codename=${distro_codename}-backports,label=Ubuntu-Backports";
};

Unattended-Upgrade::Package-Blacklist {
//      "firefox";
//      "chromium-browser";
//      "kernel-*";
};

// Unattended-Upgrade::Mail "root";
// Unattended-Upgrade::MailOnlyOnError "true";
Unattended-Upgrade::Auto-Reboot "false";
Unattended-Upgrade::Auto-Reboot-Time "02:00";
Интерпретация примера:

APT::Periodic::Unattended-Upgrade "1";: Включены периодические автоматические обновления.
Unattended-Upgrade::Origins-Pattern: Обновления берутся из репозиториев Ubuntu-Security, Ubuntu и Ubuntu-updates.
Unattended-Upgrade::Package-Blacklist: Никакие пакеты не заблокированы (закомментировано).
Unattended-Upgrade::Auto-Reboot "false";: Автоматическая перезагрузка отключена.
Unattended-Upgrade::Auto-Reboot-Time "02:00";: Если перезагрузка была бы включена, она произошла бы в 2:00 утра (но это не имеет значения, т.к. перезагрузка отключена).
Unattended-Upgrade::Mail "root"; (закомментировано): По умолчанию почта отправляется пользователю root.
Unattended-Upgrade::MailOnlyOnError "true"; (закомментировано): Уведомления будут отправляться только при ошибках.
Если вы хотите поделиться содержимым файла (или его частью) для более конкретной помощи, используйте команды cat или less для просмотра содержимого, скопируйте текст из терминала и вставьте его сюда. Пожалуйста, удалите любые личные данные, такие как адрес электронной почты, если они есть.
