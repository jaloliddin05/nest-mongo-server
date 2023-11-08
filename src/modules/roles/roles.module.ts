import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BusinessModule } from "../business/business.module";
import { Business, BusinessSchema } from "../business/business.schema";
import { BusinessService } from "../business/business.service";
import { RoleController } from "./roles.controller";
import { Role, RolesSchema } from "./role.schema";
import { RolesService } from "./roles.service";

@Module({
    imports: [
      MongooseModule.forFeature([{ name: Role.name, schema:RolesSchema }]),
      MongooseModule.forFeature([{ name: Business.name, schema:BusinessSchema }]),
],
    controllers: [RoleController],
    providers: [RolesService],
    exports: [RolesService],
  })
  export class RolesModule {}