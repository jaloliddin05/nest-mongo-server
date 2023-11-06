import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { VariantsModule } from './modules/variants/variants.module';
import { ComponentsModule } from './modules/components/components.module';
import { ShopsModule } from './modules/shops/shops.module';
import { BusinessModule } from './modules/business/business.module';
import { RolesModule } from './modules/role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    UsersModule,
    CategoriesModule,
    ProductsModule,
    VariantsModule,
    ComponentsModule,
    ShopsModule,
    BusinessModule,
    RolesModule
  ],
})
export class AppModule {}
