import express, { Application } from "express";
import { createServer, Server  } from 'node:http';
import { Server as Io } from "socket.io";

export class App {
    public app: Application;
    public server: Server;
    private socketIo: Io

    constructor(){
        this.app = express()
        this.server = createServer(this.app)
        this.socketIo = new Io(this.server, {
            cors: {
                origin: '*'
            }
        })

        //cria evento
        this.socketIo.of('/streams').on('connection', socket =>{
            console.log('conectou')

            socket.on('disconnect', ()=>{
                console.log('user desconectou')
            })

            socket.on('message', (message)=>{
                // assim eu crio um brodcast que envia para todo mundo do canal menos para quem enviou
                socket.broadcast.emit('message', message)
               /*  envia a mensagem para todo mundo
                this.socketIo.emit('message', message) */
                console.log('user na room')
            })
        })
    }
}