import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT, 10),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendEmail(createUserDto: CreateUserDto) {
    const mailOptions = {
      from: `"No Reply" <${process.env.EMAIL_FROM}>`,
      to: createUserDto.email,
      subject: `🎉 Parabéns, ${createUserDto.name}! Sua conta foi criada com sucesso!`,
      text: `Olá, ${createUserDto.name}! 👋
      Bem-vindo ao melhor sistema de notas do mundo! 🎯 Sua conta foi criada com sucesso, e agora você pode aproveitar todos os nossos recursos.`,
    };
    await this.transporter.sendMail(mailOptions);
  }
}
