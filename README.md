# CS436_FinalProject — Password & Passphrase Generator

โปรเจคตัวอย่างสำหรับวิชา CS436: ระบบสร้างรหัสผ่านสุ่ม (Random Password Generator)

## ผู้พัฒนา
1670704251 นุชนิชา รุ่งพรหมา เลขที่ 23
1670704376 ธนกฤต ดีเนียม เลขที่ 24

## ฟีเจอร์หลัก
- สร้างรหัสผ่านแบบกำหนดความยาวและรวมสัญลักษณ์
- สร้าง passphrase (หลายคำ) ที่จำง่ายแต่แข็งแรง
- แสดงคะแนนความปลอดภัย (Security Score) พร้อมคำแนะนำ
- บันทึกประวัติการสร้างรหัส/วลี (PasswordHistory)

## เทคโนโลยี
- Frontend: React + Vite
- Styling: Tailwind CSS
- ภาษา: TypeScript

## โครงสร้างโปรเจค (สำคัญ)
- `01_Requirements/` — เอกสารความต้องการและ user stories
- `02_UX_UI_Design/` — ไอเดียและ prototype
- `03_System_Design/` — Diagram ต่างๆ 
- `04_Implementation/src/` — โค้ดต้นฉบับของเว็บแอป
  - `App.tsx` — entry point
- `components/` — คอมโพเนนต์ UI เช่น `PasswordOptions.tsx`, `PassphraseOptions.tsx`, `PasswordDisplay.tsx`, `PasswordHistory.tsx`, `SecurityScore.tsx`, `SecurityTips.tsx`
    - `utils/` — ตัวช่วยการสุ่มรหัสและสุ่มคำ (`passwordGenerator.ts`, `passphraseGenerator.ts`)
- `05_Testing/` — รายงานการทดสอบและหลักฐาน
- `06_Deployment_Review/` — คู่มือและบันทึกการ deploy

## รันโปรเจค (PowerShell)
1. โคลนโปรเจคจาก GitHub:
```powershell
git clone https://github.com/Eterhart/CS436_FinalProject.git
cd CS436_FinalProject/04_Implementation
```
2. ติดตั้ง dependency และรัน dev server:
```powershell
npm install
npm run dev
```
3. เปิดเบราว์เซอร์ไปที่ URL ที่ Vite ให้มา (ปกติ `http://localhost:5173`)

## คำแนะนำสำหรับการสาธิต
- เตรียม 2 กรณี: สร้างรหัสผ่านแบบมีสัญลักษณ์ และสร้าง passphrase 4-5 คำ
- แสดง `SecurityScore` ขณะเปลี่ยนพารามิเตอร์
- แสดง `PasswordHistory` ว่ามีการบันทึกอัตโนมัติ

## การเตรียมไฟล์เพิ่มเติม
- เพิ่มไฟล์ `.gitignore` (แนะนำ: `node_modules/`, `dist/`, `.env`, `.vscode/`)
- เพิ่ม `README.md` นี้ที่รูทโปรเจค

## แนวทางต่อยอด / Future work
- เพิ่มการเข้ารหัสสำหรับเก็บประวัติ
- เพิ่มการรองรับ 2FA และการเชื่อมต่อกับบัญชีผู้ใช้
- ปรับปรุงอัลกอริทึมประเมินความแข็งแรงให้ละเอียดขึ้น