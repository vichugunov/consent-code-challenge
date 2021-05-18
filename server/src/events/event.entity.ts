import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './../users/user.entity'
import { ApiProperty } from '@nestjs/swagger'

export enum EventTypeEnum {
  Email = 'email_notifications',
  Sms = 'sms_notifications'
}

@Entity({ name: 'events' })
export class Event {
  @ApiProperty({
    type: String,
    format: 'uuid'
  })

  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({
    type: String,
    enum: EventTypeEnum
  })
  @Column({
    type: 'enum',
    enum: EventTypeEnum,
  })
  type: string

  @ApiProperty()
  @Column()
  enabled: boolean

  @ApiProperty({
    type: String,
    format: 'date-time'
  })
  @Column()
  timestamp: Date

  @ManyToOne(type => User, user => user.events)
  @JoinColumn({name: 'user_id'})
  user: User
}