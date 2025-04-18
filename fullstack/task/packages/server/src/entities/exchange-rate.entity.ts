import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, MinLength } from 'class-validator';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { VAR_CHAR } from './constants';

@ObjectType()
@Entity()
export class ExchangeRate {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    public id!: string;

    @IsString()
    @MinLength(1)
    @Field(() => String)
    @Column({ ...VAR_CHAR })
    public country!: string;

    @IsString()
    @MinLength(1)
    @Field(() => String)
    @Column({ ...VAR_CHAR })
    public currency!: string;

    @IsNumber()
    @Field(() => Float)
    @Column({ type: 'float' })
    public amount!: number;

    @IsString()
    @MinLength(1)
    @Field(() => String)
    @Column({ ...VAR_CHAR })
    @Index()
    public code!: string;

    @IsNumber()
    @Field(() => Float)
    @Column({ type: 'float' })
    public rate!: number;

    @Field(() => Date)
    @Column({ type: 'timestamp' })
    public createdAt!: Date;
}

@ObjectType()
export class ExchangeRateCache {
    @Field(() => Date)
    public fetchedAt!: Date;

    @Field(() => [ExchangeRate])
    public rates!: ExchangeRate[];
}
