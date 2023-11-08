import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RolesModule } from "../roles/roles.module";
import { Role, RolesSchema } from "../roles/role.schema";
import { PermissionController } from "./permissions.controller";
import { Permission, PermissionsSchema } from "./permission.schema";
import { PermissionService } from "./permissions.service";


@Module({
    imports: [
      MongooseModule.forFeature([{ name: Permission.name, schema:PermissionsSchema }]),
      MongooseModule.forFeature([{ name: Role.name, schema:RolesSchema }]),
],
    controllers: [PermissionController],
    providers: [PermissionService,RolesModule],
    exports: [PermissionService],
  })
  export class PermissionsModule {}