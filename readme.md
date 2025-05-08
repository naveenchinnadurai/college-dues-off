
# ⚡ FastAPI Backend for React Native App

This project is a high-performance FastAPI backend tailored for integration with a React Native mobile app. It uses `uv` for dependency management and leverages a robust and modern set of libraries for scalability, security, and performance.

---

## 📚 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

---

## 🚀 Features

- 🧬 Async REST APIs with FastAPI
- 🔒 JWT authentication with password hashing
- 🧾 Auto-generated API docs (Swagger & ReDoc)
- 📦 SQLAlchemy for database modeling
- 🔄 Async database operations with psycopg3 for PostgreSQL
<!-- - 📡 Support for WebSockets (via `uvicorn` and `websockets`) -->
- ⚙️ Dependency management using [uv](https://github.com/astral-sh/uv)
- 🧪 Unit and integration testing with `pytest`

---

## 🛠️ Tech Stack

| Component       | Library/Tool           |
|----------------|------------------------|
| Web Framework   | FastAPI 0.115.12       |
| Server          | Uvicorn 0.34.0         |
| Dependency Mgmt | uv                    |
| ORM             | SQLAlchemy 2.0.40      |
| Auth            | PyJWT, Passlib (bcrypt)|
| DB Driver       | psycopg (PostgreSQL)   |
| Config          | python-dotenv          |
| API Docs        | Swagger, ReDoc         |
| Testing         | pytest (setup optional)|

---

## 📁 Project Structure

```

FastAPI-Backend/
│
├── controllers/            # Controllers for handling business logic
│   ├── auth_controller.py  # Authentication logic
│   ├── schemas.py          # Pydantic models for request validation
│   ├── staff_controller.py # Staff management logic
│   └── student_controller.py # Student management logic
│
├── db/                     # Database utilities and models
│   ├── database.py         # Database connection
│   ├── init_db.py          # Database initialization script
│   ├── models.py           # SQLAlchemy models
│   └── models_old_v1.py    # Older version of models (backup)
│
├── routes/                 # API routes for each resource
│   ├── auth_routes.py      # Authentication related routes
│   ├── staff_routes.py     # Staff-related API routes
│   └── student_routes.py   # Student-related API routes
│
├── utils/                  # Utility functions
│   ├── auth_bearer.py      # Bearer token handling
│   ├── auth_handler.py     # Authentication handling logic
│   └── password_utils.py   # Password hashing and utils
│
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
├── hash.py                 # Custom hash logic (if any) script for hashing 
├── main.py                 # FastAPI app instance
├── pyproject.toml          # Project metadata and dependencies
├── readme.md               # Project documentation
├── requirements.in         # Dependencies for installation
├── requirements.txt        # Final dependencies (locked versions)
├── requirementsclone.txt   # Backup of requirements (older version)
└── uv.lock                 # uvicorn lock file for fast deployments

````

---

## 🚀 Getting Started

### Prerequisites

- Python 3.10+
- [`uv`](https://github.com/astral-sh/uv) (install via `pip install uv`)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/naveenchinnadurai/college-dues-offt
cd college-dues-off
````

2. **Create a virtual environment and install dependencies**

```bash
uv venv
uv add -r requirements.txt
```

3. **Setup environment variables**

```bash
cp .env.example .env
```

4. **Start development server**

```bash
uvicorn app.main:app --reload
```

---

## 📑 API Documentation

* Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
* ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

<!-- ## 🔐 Environment Variables

Sample `.env` file:

```env
DATABASE_URL=postgresql+psycopg://user:password@localhost/dbname
SECRET_KEY=supersecretjwtkey
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

Database_URI = postgresql+psycopg://postgres:admin@localhost:5432/CollegeConnect

secret = 15d06b572121fde5ff1b9f4a34583b2d

algorithm = HS256

-->

---

## 📜 Scripts

| Command                            | Description            |
| ---------------------------------- | ---------------------- |
| `uvicorn app.main:app --reload`    | Run development server |
| `uv add ...`               | Install a new package  |
| `pytest`                           | Run all tests          |
| `uv pip freeze > requirements.txt` | Update lock file       |

---

## 📦 Dependencies

Below is a snapshot of core dependencies used (from `requirements.txt`):

* `fastapi==0.115.12`
* `uvicorn[standard]==0.34.0`
* `httpx==0.28.1`
* `sqlalchemy==2.0.40`
* `pydantic==2.9.2`
* `bcrypt==4.3.0`
* `passlib[bcrypt]==1.7.4`
* `pyjwt==2.10.1`
* `psycopg[binary,pool]==3.2.6`
* `python-dotenv==1.1.0`
* `email-validator==2.2.0`
* `watchfiles==1.0.5`
* `typer==0.15.2`
* `rich==14.0.0`
* `fastapi-cli[standard]==0.0.7`

> ℹ️ For full dependency details, see [`requirements.txt`](./requirements.txt)

<!-- ---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes and push: `git push origin feature-name`
4. Open a Pull Request
 -->


---

## 📬 Contact

Questions? Contact us at [dev.iamkarthickeyan.com](mailto:your.email@example.com)

---



