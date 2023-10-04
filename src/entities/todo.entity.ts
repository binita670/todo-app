import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"; 

@Entity({
   name: 'todo-list'
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

   @Column() 
   createdat: Date; 

   @Column() 
   updatedat: Date; 
}