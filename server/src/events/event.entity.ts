import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './../users/user.entity'

@Entity({ name: 'events' })
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string

  // TODO make it enum
  @Column()
  type: string

  // TODO make it bool
  @Column()
  enabled: boolean

  @Column()
  timestamp: Date

  @ManyToOne(type => User, user => user.events)
  @JoinColumn({name: 'user_id'})
  user: User
}