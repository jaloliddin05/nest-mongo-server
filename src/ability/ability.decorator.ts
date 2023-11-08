import {  SetMetadata } from "@nestjs/common";
import { User } from "src/modules/users/user.schema";

import { Action, Subjects } from "./ability.factory/ability.factory";

export interface RequiredRule {
    action: Action;
    subject:Subjects;
}

export const CHECK_ABILITY = 'check_ability' 

export const CheckAbilites = (...requirements:RequiredRule[]) => SetMetadata(CHECK_ABILITY, requirements);


export class ReadUserAbility implements RequiredRule{
    action = Action.Read;
    subject = User;
}

