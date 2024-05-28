import { type DataSource } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('NewsletterSubscriptions')
export class NewsletterSubscriptionEntity implements DataSource.DBNewsletterSubscription {
    @PrimaryColumn('varchar')
    emailAddress!: string;

    @Column('datetime')
    createdAt!: Date;
}
