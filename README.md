---

## ⚙️ Getting Started

### Prerequisites
- .NET 10 SDK
- Node.js 18+
- Docker

### 1. Start MSSQL via Docker
```bash
docker run -e "SA_PASSWORD=YourPassword!" -p 1433:1433 --name mssql -d mcr.microsoft.com/mssql/server
```

### 2. Configure Connection String
Copy `appsettings.example.json` to `appsettings.json` and fill in your credentials before running.

**Option A: Using appsettings.json (Development Only)**
```bash
cd Hospital-Appointment.API
cp appsettings.example.json appsettings.json
# Edit appsettings.json and replace YOUR_PASSWORD_HERE with your actual SQL Server password
```

**Option B: Using User Secrets (Recommended for Development)**
```bash
cd Hospital-Appointment.API
dotnet user-secrets init
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=localhost,1433;Database=HospitalAppointmentDB;User Id=sa;Password=YOUR_PASSWORD_HERE;TrustServerCertificate=True"
```

### 3. Run Migrations & Start API
```bash
cd Hospital-Appointment.API
dotnet ef database update
dotnet run
```
API runs on: `http://localhost:5137`

### 4. Start Frontend
```bash
cd hospital-appointment-ui
npm install
npm start
```
App runs on: `http://localhost:3000`

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/Appointment` | List all appointments |
| POST | `/api/Appointment` | Create appointment |
| PUT | `/api/Appointment/{id}` | Update appointment status |
| DELETE | `/api/Appointment/{id}` | Delete appointment |
| GET | `/api/Doctor` | List all doctors |
| GET | `/api/Department` | List all departments |
| GET | `/api/Patient` | List all patients |
| GET | `/api/Hospital` | List all hospitals |

---

## 👨‍💻 Author

**Emir Engin Deniz** — Full Stack Developer  
[GitHub](https://github.com/emirdnz) · [Fiverr](https://www.fiverr.com/emirdnz)

---

## 📄 License

MIT License