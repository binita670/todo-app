import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"; 

@Entity({
   name: 'todos'
}) 
export class Todo {   
   @PrimaryGeneratedColumn() 
   id: number; 
   
   @Column({nullable: false}) 
   name: string; 
   
   @Column({nullable: false}) 
   description: string; 

   @Column({nullable: false}) 
   deadline: Date;

   @Column({nullable: false, default: false}) 
   done: Boolean; 

   @Column() 
   createdAt: Date; 

   @Column() 
   updatedAt: Date; 
}