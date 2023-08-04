import request from 'supertest';
import app from '../../../app';
import { DataSource } from 'typeorm';
import { MyDataSource } from '../../../data-source';
import { catchAllUsersService } from '../../../services/users/catchAllUsers.service';
import { loginService } from '../../../services/login/login.service';
import { updateUser } from '../../../services/users/updateUser.service';
import { MyError } from '../../../errors/myError';
import { TUserReqUpdate } from '../../../interfaces/users.interface';
import { ZodError } from 'zod';

describe('Testes da rota de criação de usuário', () => {
    let connection: DataSource;

    beforeAll(async () => {
        await MyDataSource.initialize()
        .then((res) => (connection = res))
        .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
    });

    afterAll(async () => {
        await connection.destroy();
    });

    test('Deve criar um usuário com sucesso', async () => {
        const userData = {
        full_name: 'Ukaban',
        email: 'Ugla@mail.com',
        password: 'TOTHEKING',
        phone_number: '(62) 97081-7612',
        };

        const response = await request(app)
        .post('/users')
        .send(userData);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
        id: expect.any(Number),
        full_name: userData.full_name,
        email: userData.email,
        phone_number: userData.phone_number,
        created_at: expect.any(String),
        });
    });

    test('Não deve criar um usuário com email repetido', async () => {
        const userData = {
        full_name: 'Ukaban',
        email: 'Ugla@mail.com',
        password: 'TOTHEKING',
        phone_number: '(62) 97081-7612',
        };

        const response = await request(app)
        .post('/users')
        .send(userData);

        expect(response.status).toBe(409);
        expect(response.body).toEqual({ message: 'Email already exists' });
    });

    test('Deve retornar erro ao criar usuário com body inválido', async () => {
        const userData = {
        full_name: 'Ukaban',
        email: 'Ugla@mail.com',
        };

        const response = await request(app)
        .post('/users')
        .send(userData);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
        message: {
            password: ['Required'],
            phone_number: ['Required'],
        },
        });
    });

    test('Listar usuários - sucesso', async () => {
        const userList = await catchAllUsersService();
    
        expect(userList).toBeDefined();
        expect(Array.isArray(userList)).toBe(true);
        expect(userList.length).toBeGreaterThan(0);
        expect(userList[0]).toMatchObject({
        full_name: expect.any(String),
        email: expect.any(String),
        password: expect.any(String),
        phone_number: expect.any(String),
        });
    });
  
    test('Atualizar um usuário - sucesso', async () => {
        const loginData = {
            email: 'Ugla@mail.com',
            password: 'TOTHEKING',
        };
    
        const token = await loginService(loginData);

        if (!token) {
            fail('Token is missing.');
        }
    
        const userId = 1;
    
        const updateData = {
        email: 'novoEmail@mail.com',
        };
    
        const updatedUser = await updateUser(userId, updateData);
    
        expect(updatedUser).toBeDefined();
        expect(updatedUser).toMatchObject({
        full_name: expect.any(String),
        email: 'novoEmail@mail.com',
        password: expect.any(String),
        phone_number: expect.any(String),
        });
    });
  
    test('Atualizar um usuário sem validação - falha', async () => {
        const response = await request(app)
        .patch('/users/1') 
        .set('Authorization', '');

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ message: 'Missing token' });
        
    });
  
    test('Atualizar um usuário sem id no banco - falha', async () => {
        const userId = 9999;
    
        const updateData = {
        email: 'novoEmail23@mail.com',
        };
    
        try {
        await updateUser(userId, updateData);
        } catch (error) {
        expect((error as MyError).message).toBe('User not found!');
        expect((error as MyError).statusCode).toBe(409);
        }
    });
  
    test('Atualizar um usuário com email repetido do banco - falha', async () => {
        const userId = 1;
    
        const updateData = {
        email: 'novoEmail@mail.com',
        };
    
        try {
        await updateUser(userId, updateData);
        } catch (error) {
        expect((error as MyError).message).toBe('Email already exists');
        expect((error as MyError).statusCode).toBe(409);
        }
    });
  
    test('Atualizar um usuário com body inválido - falha', async () => {
        const userId = 1;
    
        const updateData = {
        logradouro: 'casa do avião',
        } as TUserReqUpdate;
    
        try {
        await updateUser(userId, updateData);
        } catch (error) {
        expect((error as MyError).statusCode).toBe(400);
        expect((error as ZodError).message).toMatchObject({
            message: {
                full_name: ['Required'],
                email: ['Required'],
                password: ['Required'],
                phone_number: ['Required'],
            }
        });
        }
    });   
});