import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Bcrypt } from '../auth/bcript/bcript';
import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;
  let bcript: Bcrypt;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: Bcrypt,
          useValue: {
            encryptPassword: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get(UserService);
    userRepository = module.get(getRepositoryToken(User));
    bcript = module.get(Bcrypt);
  });

  it('userService should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'teste',
        email: 'teste@email.com',
        password: '123456', // Senha original
      };

      const hash = 'hashpassword';

      // Simula que o usuário não existe ainda
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);

      // Simula o retorno da função encryptPassword
      jest.spyOn(bcript, 'encryptPassword').mockResolvedValue(hash);

      // Simula um usuário completo com os campos obrigatórios
      const savedUser: User = {
        id: 1,
        name: createUserDto.name,
        email: createUserDto.email,
        password: hash,
        notes: [],
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Simula o comportamento do save
      jest.spyOn(userRepository, 'save').mockResolvedValue(savedUser);

      const result = await userService.create(createUserDto);

      // Verifica se a senha original foi passada para a função de criptografia
      expect(bcript.encryptPassword).toHaveBeenCalledWith('123456');

      // Verifica se o repositório `save` foi chamado com os dados corretos (sem id, timestamps etc.)
      expect(userRepository.save).toHaveBeenCalledWith({
        ...createUserDto,
        password: hash,
      });

      // Verifica se o retorno do serviço é o usuário completo esperado
      expect(result).toEqual(savedUser);
    });
  });
});
