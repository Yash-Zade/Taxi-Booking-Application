# 🚖 CabZilla – Smart Taxi Booking Platform

CabZilla is a full-stack taxi booking web application where riders can book rides, drivers can accept/reject ride requests in real time, and admins can manage the overall system. It includes features like geolocation, dynamic fare calculation, role-based authentication, real-time updates using WebSocket, and more.

---

## 🌐 Live Demo

> https://cabzilla.vercel.app/

---

## 📌 Features

### Rider
- Signup/Login
- Book a ride using pickup & drop-off locations
- View ride status and history
- Pay with chosen method (COD/Online)

### Driver
- Login and view ride requests
- Accept or reject rides
- See pickup and drop-off locations with map names
- Track real-time ride status

### Admin
- Access to admin dashboard
- View and manage all rides
- View all registered users

### Core
- Reverse geocoding to display location names
- Fare calculation based on coordinates
- Real-time communication via WebSocket (STOMP)
- JWT authentication and role-based access
- Responsive and elegant UI with Tailwind CSS

---

## 🧱 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Spring Boot
- Spring Security with JWT
- Spring Data JPA
- PostgreSQL + PostGIS
- Swagger for API documentation

---

## 📁 Project Structure

```
CabZilla/
│
├── backend/
│   ├── src/main/java/com/cabzilla/...
│   └── resources/application.properties
│
├── frontend/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── utils/
│   └── AppRoutes.jsx
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js + npm
- PostgreSQL with PostGIS extension
- Maven

---

### Backend Setup

```bash
cd backend
# Configure DB in application.properties
./mvnw spring-boot:run
```

✅ Swagger will be available at:

```bash
http://localhost:8080/swagger-ui/index.html
```

---

## 🖥️ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Runs at:

```bash
http://localhost:5173
```

---

## 🔐 Authentication & Authorization

- JWT tokens stored in `localStorage`
- Protected routes via custom `ProtectedRoute`
- Backend verifies roles before accessing protected APIs

---

## 🗺️ Geo Features

- Uses `getPlaceFromCoordinates` utility to convert coordinates to address names using reverse geocoding
- PostGIS integration to support spatial data in PostgreSQL
- Dynamic fare calculation based on haversine formula or map API

---

## 🛠️ API Docs

Available via Swagger UI:

> http://cabzilla.koyeb.app/swagger-ui/index.html


---

## 🛡️ Security

- JWT-based Spring Security
- BCrypt password encoding
- Cross-Origin Resource Sharing (CORS) configured

---

## 📈 Future Enhancements

- Google Maps integration
- Real-time driver tracking
- Rating system for rides
- In-app chat between rider & driver
- Stripe/Razorpay payment integration

---

## 👨‍💻 Author

**Yash Zade**  
Final Year Computer Science Student  
[GitHub](https://github.com/Yash-Zade) | [LinkedIn](https://www.linkedin.com/in/yash-zade/)

---

