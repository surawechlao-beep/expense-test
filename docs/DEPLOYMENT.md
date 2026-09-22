# ติดตั้ง EXION Expense Workspace 8

ชุดพัฒนานี้ยังไม่ได้ push ไป GitHub หรือ deploy ไป Apps Script จริง ให้ตรวจรับบนชุดข้อมูลทดสอบก่อนเปลี่ยนระบบที่พนักงานใช้

## 1. เตรียมระบบทดสอบ

1. สำรอง Spreadsheet เดิม โค้ด Apps Script เวอร์ชันที่ใช้งาน และรายการ trigger/deployment
2. ทำสำเนา Spreadsheet และใช้ Apps Script โปรเจกต์ทดสอบแยกจาก production ตรวจว่าอีเมลพนักงาน ผู้อนุมัติ และค่า notification เป็นบัญชีทดสอบก่อนเริ่มกดส่ง
3. ใช้โฟลเดอร์ใบเสร็จและไฟล์รายงานทดสอบแยกจากของจริง ตรวจ `Settings` โดยเฉพาะ `RECEIPT_FOLDER_ID` และการเข้าถึงโฟลเดอร์
4. คงชื่อชีทและลำดับคอลัมน์ตามระบบเดิม โค้ดนี้ยังมีส่วนที่อ้างอิงตำแหน่งคอลัมน์โดยตรง ไม่ได้ย้ายโครงสร้างฐานข้อมูลให้อัตโนมัติ

## 2. ตั้งค่า Apps Script

แทนที่ Code.gs เดิมด้วย `backend/Code.gs` และเพิ่ม `backend/Auth.gs` ในโปรเจกต์เดียวกัน ไม่ต้องสร้างโฟลเดอร์ backend ใน Apps Script ตรวจว่าเหลือ `doGet` และ `doPost` อย่างละหนึ่งฟังก์ชัน ซึ่งอยู่ใน Auth.gs

ใน Project Settings → Script Properties กำหนด:

| ชื่อ | ค่า |
|---|---|
| `EXPENSE_SHEET_ID` | ID ของ Spreadsheet ทดสอบ หรือ production ในขั้นตอนเปิดใช้จริง |
| `EXPENSE_LEGACY_SECRET` | ค่า API_SECRET เดิมจากระบบที่ใช้อยู่ เก็บเฉพาะเซิร์ฟเวอร์เพื่อให้ hash รหัสผ่านเดิมยังตรวจได้ |
| `EXPENSE_SIGNING_KEY` | ไม่ต้องกรอกเอง ให้ฟังก์ชัน initialize สร้าง |

รัน `initializeWorkspaceV8()` จาก editor และอนุญาตสิทธิ์ให้บัญชีผู้ดูแล ฟังก์ชันนี้ตรวจ properties และสร้าง signing key โดยไม่เปลี่ยนข้อมูลคำขอ ห้ามนำ properties หรือ signing key ไปใส่ frontend/GitHub

การจัดการ properties อ้างอิง [Apps Script Properties Service](https://developers.google.com/apps-script/guides/properties)

Deploy → New deployment → Web app ใช้บัญชีที่มีสิทธิ์เข้าถึงชีทและโฟลเดอร์เป็นผู้รัน ตัว frontend ปัจจุบันใช้ API login ของแอป จึงต้องตั้งการเข้าถึง endpoint ให้รองรับคำขอจากเว็บภายนอกตามนโยบายองค์กร หากองค์กรห้าม anonymous endpoint ต้องปรับระบบยืนยันตัวตนก่อนเปิดใช้ ไม่ใช่ลดข้อจำกัดขององค์กรเพื่อให้ติดตั้งผ่าน ดู [Google Web Apps deployment and permissions](https://developers.google.com/apps-script/guides/web)

คัดลอก URL ที่ลงท้าย `/exec` และใส่ใน `CONFIG.API_URL` ที่ `js/config.js` สำหรับ frontend ทดสอบ URL `/dev` มีไว้สำหรับผู้แก้ไขสคริปต์เท่านั้น

## 3. บัญชีและการเข้าใช้

- บัญชีเดิมใช้รหัสเดิมได้เมื่อ `EXPENSE_LEGACY_SECRET` ตรงกับของเดิม
- บัญชีใหม่ต้องมีแถว Staff และ Active เป็น `YES` หรือ boolean true
- ผู้ดูแลตั้ง Script Property `SETUP_EMAIL` เป็นอีเมลพนักงาน แล้วรัน `issueSetupCodeFromEditor()` รับรหัสจาก execution log ส่งรหัสให้พนักงานผ่านช่องทางส่วนตัว รหัสหมดอายุใน 24 ชั่วโมงและใช้ได้ครั้งเดียว
- พนักงานเปิดหน้าล็อกอิน เลือกตั้งรหัสใหม่ กรอกอีเมล รหัสตั้งบัญชี และรหัสผ่านใหม่
- หัวหน้าสามารถรีเซ็ตรหัสของสมาชิกที่มีสิทธิ์จัดการจากหน้าทีม ระบบแสดงรหัสตั้งบัญชีให้ส่งต่อ ไม่ได้ส่งอีเมลรหัสให้อัตโนมัติ
- การ logout/reset เพิกถอนเซสชันเดิม เซสชันใหม่มีอายุ 8 ชั่วโมง เก็บใน sessionStorage ของแท็บ

Staff เดิมต้องมีคอลัมน์ A–M ตามลำดับ: StaffID, Name, Department, Email, Position, Manager, Active, GetsDepreciation, Team, PasswordHash, PasswordSetAt, ResetToken, SignatureURL

## 4. ตรวจรับก่อนเปิดใช้

ทำรายการใน [QA.md](QA.md) โดยเฉพาะการอนุมัติจริง PDF ลายเซ็น ราคาน้ำมัน เงินสดย่อย และสิทธิ์อ่านใบเสร็จ Google Drive การผ่าน mock tests ยังไม่ยืนยันส่วนเชื่อมต่อ Google เหล่านี้

อย่ารัน `setupAutomation()` หรือ `setupPettyCash()` บน production ซ้ำโดยไม่ตรวจการตั้งค่าและ trigger เดิม เพราะเป็นฟังก์ชันจัดเตรียมระบบเดิม ไม่ใช่ขั้นตอนอัปเกรด UI ที่จำเป็น

## 5. เปิดใช้จริง

1. กำหนดช่วงเปลี่ยนรุ่น สำรองข้อมูล และให้ผู้ใช้ออกจากระบบ/ปิดแท็บเก่า
2. ตั้ง properties ในโปรเจกต์ production และอัปเดต deployment เป็น backend รุ่นใหม่
3. ตั้ง `CONFIG.API_URL` ของ frontend ให้ชี้ deployment ใหม่นั้น แล้วเผยแพร่ static files พร้อมกันทั้งชุดบน HTTPS
4. ปิด deployment เก่าที่เปิด endpoint แบบ shared secret หลังตรวจรับการเปลี่ยนรุ่น ไม่ปล่อยให้เป็นทางเข้าข้ามสิทธิ์ของระบบใหม่
5. ทดสอบ login → ส่งค่าใช้จ่าย → หัวหน้าอนุมัติ → ส่งรอบเบิก → บัญชีบันทึกจ่าย ด้วยบัญชีที่กำหนดสำหรับตรวจรับ
6. PWA รอปิดแท็บเก่าจึงสลับ cache รุ่นใหม่ ถ้ายังเห็นหน้าเก่าให้ปิดทุกแท็บ/หน้าต่าง PWA แล้วเปิดใหม่ อย่าล้าง site data ระหว่างมีร่างที่ยังไม่ส่ง เพราะร่างและไฟล์แนบอยู่ใน IndexedDB เครื่องนั้น

## 6. เมื่อมีปัญหา

- ปิดรับรายการใหม่ชั่วคราวและเก็บ BatchID/RequestID ที่มีปัญหา ตรวจแถวจริงก่อนส่งใหม่หรือลบข้อมูล
- ย้อน frontend/backend เป็นคู่เวอร์ชันที่เข้ากันได้ การคืน frontend เก่าอย่างเดียวใช้กับ authentication ใหม่ไม่ได้
- การย้อน backend เก่าจะคืนข้อจำกัดด้านสิทธิ์แบบเดิมด้วย จึงควรจำกัดการเข้าถึงระหว่างแก้ไข
- อย่านำสำรอง Spreadsheet มาเขียนทับทั้งชุดหลังมีรายการใหม่ ให้ตรวจและย้ายข้อมูลโดยรักษารายการที่เกิดระหว่างเปลี่ยนรุ่น

ข้อจำกัดที่ยังคงอยู่: รูปแบบ hash รหัสผ่านเดิม, quota ของ Apps Script, Drive/Sheets ซึ่งไม่ใช่ transaction เดียวกัน อัปโหลดขัดข้องอาจมีไฟล์กำพร้าใน Drive แม้ยังไม่เขียนคำขอลงชีท และการทดสอบ staging จริงยังจำเป็น
