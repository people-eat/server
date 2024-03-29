import { Shared, type DataSource } from '@people-eat/server-domain';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { CookEntity } from './CookEntity';
import { CourseEntity } from './CourseEntity';
import { KitchenEntity } from './KitchenEntity';
import { MenuCategoryEntity } from './MenuCategoryEntity';

@Entity('Menus')
@Index(['menuId', 'cookId'])
export class MenuEntity implements DataSource.DBMenu {
    @PrimaryColumn('char', { length: 20 })
    menuId!: string;

    @Column('char', { length: 20 })
    cookId!: string;

    @Column('bool')
    isVisible!: boolean;

    @Column('varchar')
    title!: string;

    @Column('text')
    description!: string;

    @Column('smallint', { unsigned: true })
    preparationTime!: number;

    @Column('char', { length: 20, nullable: true })
    kitchenId?: string;

    @Column('varchar', { nullable: true })
    greetingFromKitchen?: string;

    @Column('smallint', { unsigned: true })
    basePrice!: number;

    @Column('smallint', { unsigned: true })
    basePriceCustomers!: number;

    @Column('smallint', { unsigned: true })
    pricePerAdult!: number;

    @Column('smallint', { nullable: true, unsigned: true })
    pricePerChild?: number;

    @Column('enum', {
        enum: ['EUR', 'USD'],
        enumName: 'CurrencyCode',
    })
    currencyCode!: Shared.CurrencyCode;

    @Column('datetime')
    createdAt!: Date;

    /* relations */

    @ManyToOne(() => CookEntity, (cook: CookEntity) => cook.menus, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'cookId' })
    cook?: CookEntity;

    @ManyToOne(() => KitchenEntity, (menuKitchen: KitchenEntity) => menuKitchen.menus, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        cascade: true,
    })
    @JoinColumn({ name: 'kitchenId' })
    kitchen?: KitchenEntity;

    @OneToMany(() => CourseEntity, (course: CourseEntity) => course.menu, { cascade: true })
    courses?: CourseEntity[];

    @OneToMany(() => MenuCategoryEntity, (menuCategory: MenuCategoryEntity) => menuCategory.menu, { cascade: true })
    menuCategories?: MenuCategoryEntity[];
}
