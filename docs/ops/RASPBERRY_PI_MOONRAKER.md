# Raspberry Pi + Moonraker ↔ Agri Monitor (superseded)

**This guide is superseded.** Edge capture now targets
[agri-monitor/klipper](https://github.com/agri-monitor/klipper) with **fswebcam**
(`camera-macros/save_image.sh`). The `agri_monitor_agent` package lives in that
klipper repo — do not clone Moonraker for the agent.

→ See **[RASPBERRY_PI_KLIPPER.md](./RASPBERRY_PI_KLIPPER.md)** for registration,
heartbeat, Take Picture, ingest, and agent setup.

Database column `moonraker_url` was renamed to `klipper_url`
(migration `012_klipper_url`). API field `klipperUrl` replaces `moonrakerUrl`
(alias still accepted on register/heartbeat).
