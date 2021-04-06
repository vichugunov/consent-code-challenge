import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './../users/user.entity'

export enum EventTypeEnum {
  Email = 'email_notifications',
  Sms = 'sms_notifications'
}

@Entity({ name: 'events' })
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'enum',
    enum: EventTypeEnum,
  })
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