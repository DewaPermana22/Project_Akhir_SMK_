
[![Logo-RPL.jpg](https://i.postimg.cc/Y2Gzwrgp/Logo-RPL.jpg)](https://postimg.cc/t7bx3H2f)

# SIA RPLSMKDJ🖥️

The **Sistem Informasi Akademik (SIA)** is designed to help students and teachers make better use of technology in education. One of its main purposes is to support daily learning activities, making academic processes more efficient and accessible. In addition, AIS can also be adapted and improved to enhance communication, ensuring that information is delivered clearly and effectively. Overall, the Academic Information System serves as a tool to simplify, modernize, and optimize the teaching and learning experience.


## Key Features✨

- **Student and Teacher Data Management**  
- **Learning Materials Management**  
- **Assignment Management**  
- **Online Attendance**  
- **Academic Calendar**  
- **News Content Management**  
- **Upload and Download Assignments & Materials**  
- **Online Class Journal Entry**
- **10+ More**


## Tech Stack </>

**Client:** Vite, React, Redux, axios, TailwindCSS 4, Shadcn

**Server:** Laravel 12, Sacntum, Swagger for API Documentation

**Database:** PostgreSQL

## Requirements📋
Before running this project, make sure you have installed:
- [PHP](https://www.php.net/) (v8.2 or higher)  
- [Composer](https://getcomposer.org/)  
- [Node.js](https://nodejs.org/) (v20 or higher, compatible with Laravel 12)  
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)  
- A database server (e.g., **PostgreSQL** or MySQL, depending on your setup)  
- [Git](https://git-scm.com/)  

## Installation📦

### 1. Clone the Repository
```bash
  git clone https://github.com/DewaPermana22/ASSESMEN_SUMATIF_KK_SIARPLSMKDJ.git
  cd ASSESMEN_SUMATIF_KK_SIARPLSMKDJ
```
After cloning, you will find two main directories inside the project:

- **`rpl-client`** → Frontend (React/Vite)  
- **`rpl-api`** → Backend (Laravel API)  

### 2. Install Project Dependencies

#### Frontend (`rpl-client`)
Navigate to the Frontend directory and install dependencies:

    cd rpl-client
    npm install

#### Backend (`rpl-api`)
Navigate to the Backend directory and install dependencies with Composer:

    cd rpl-api
    composer install

After installing the dependencies, you need to configure the project before running the application👇👇.
## Configuration⚙️
### 1. Backend (`rpl-api`)
After installing dependencies, navigate to the backend folder:

```bash
cd rpl-api
```
Then copy the **`.env.example`** file to **`.env`**:
```bash
cp .env.example .env
```
Update the **`.env`** file with your configuration:
```bash
APP_NAME=Laravel
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

# Database configuration
DB_CONNECTION=mysql   # or 'pgsql' if using PostgreSQL
DB_HOST=127.0.0.1
DB_PORT=3306          # use 5432 if PostgreSQL
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Session & Sanctum
SESSION_DRIVER=cookie
SESSION_LIFETIME=10080
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=localhost
SANCTUM_STATEFUL_DOMAINS=localhost:5173,127.0.0.1:5173
SESSION_EXPIRE_ON_CLOSE=false

# Swagger (API Docs)
L5_SWAGGER_GENERATE_ALWAYS=true
L5_SWAGGER_CONST_HOST=http://localhost:8000

```
Run the following command to generate the Laravel application key:
```bash
php artisan key:generate
```
Run the following command to migration and seeding Database:
```bash
php artisan migrate
php artisan db:seed
# (Optional) Reset and seed again:
php artisan migrate:fresh --seed
```
Because this project includes an image upload feature, you need to create a symbolic link from `public/storage` to `storage/app/public`.  

Run the following command inside the `rpl-api` folder:

```bash
php artisan storage:link
```
### 2. Frontend (`rpl-client`)
In the `rpl-client` directory, you need to create two environment files:  
- `.env.development`  
- `.env.production`  

Example content for `.env.development`:
```env
VITE_API_URL=http://localhost:8000/api
```
Example content for `.env.production`:
```env
VITE_API_URL=https://your-production-domain.com/api
```
## Running the Application🚀

After completing the installation and configuration steps, the project is ready to run on your computer.  

You can also customize both the UI (frontend) and API (backend) as needed.

### Backend (`rpl-api`)
Make sure you are inside the `rpl-api` directory, then start the Laravel server:

```bash
php artisan serve
```
By default, the backend will be available at:

🔗http://localhost:8000

If you want to see the API Catalog/Documentation, you can access:

🔗http://localhost:8000/api/documentation#/Auth/e95cf528bb67fc0f040b55ef5a5aab8f

### Frontend (`rpl-client`)
Make sure you are inside the `rpl-client` directory, then start the development server:

```bash
npm run dev
```
By default, the frontend will be available at:

🔗http://localhost:5173
## Authors👨‍💻
- [Dewa Permana](https://github.com/DewaPermana22)


