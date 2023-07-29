const supertest = require('supertest')
const { app } = require('../server');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const { faker } = require('@faker-js/faker');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5MDU3MDY2Mn0.D0jky0hRLX1pQkq97seAUYsU_SBlQv3h9r-RcPdcN4A';


const user = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync("password", salt),
    role: faker.helpers.arrayElement(['user', 'admin'])
}

const userId = {
    show: 11,
    update: 11,
    delete: 11,
}

describe("USERS", () => {
    
    describe("GET /", () => {
        it("should return all users", async () => {
            const res = await supertest(app).get("/api/users").set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200);
        });
    });

    describe("POST", () => {
        it("should insert user", async () => { 
            const res = await supertest(app)
                .post("/api/users")
                .set('Authorization', `Bearer ${token}`)
                .send(user)

            expect(res.status).toBe(201);
        });
    });
    
    describe("GET /:id", () => {
        it("should return spesific user", async () => { 
            const res = await supertest(app)
                .get(`/api/users/${userId.show}`)
                .set('Authorization', `Bearer ${token}`)

            expect(res.status).toBe(200);
        });

        it("should return 404", async () => {
            const res = await supertest(app)
                .get("/api/users/999")
                .set('Authorization', `Bearer ${token}`)

            expect(res.status).toBe(404);
        });
    });

    describe("UPDATE /:id", () => {
        it("should update user", async () => { 
            const res = await supertest(app)
                .patch(`/api/users/${userId.update}`)
                .set('Authorization', `Bearer ${token}`)
                .send(user)

            expect(res.status).toBe(200);
        });
    });

    describe("DELETE /:id", () => {
        it("should delete spesific users", async () => {
            const res = await supertest(app).delete(`/api/users/${userId.delete}`).set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200);
        });
    });
    
});