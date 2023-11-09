import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { User } from "src/modules/users/user.schema";



export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}

export type Subjects = any;

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
    defineAbility() {
        const {can,cannot,build} = new AbilityBuilder(Ability)

            can(Action.Manage, User);
            cannot(Action.Read, User)
        
            // cannot(Action.Manage, User, { orgId: { $ne: user.orgId } }).because('You can only manage users in your own organization')

        return build({
            detectSubjectType: (item) => 
            item.constructor as ExtractSubjectType<Subjects>
            
        })
    }
 }
