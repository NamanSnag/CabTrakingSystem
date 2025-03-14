# Real-Time Cab Tracking System

A backend system for real-time cab tracking using WebSockets and Google Maps API, with Docker containerization.

## Features
- Real-time location updates via WebSockets
- Driver/passenger management system
- Ride booking and tracking functionality
- REST APIs for data access

## Prerequisites
- Node.js v18+
- Docker & Docker Compose
- Google Maps API key

## Installation

1. **Clone the repository**:
```bash
git clone https://github.com/yourusername/cab-tracking-system.git
```
cd cab-tracking-system

2. **Create environment file**:
#### COPY .env.toml and creact .env and past with value

3. **Start services**:
```bash
docker-compose up --build
```
