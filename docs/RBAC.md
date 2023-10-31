## Introduction

Horizen implements Role-Based Access Control (RBAC) to provide a tailored experience for different roles within the system, enabling users to accomplish their tasks effectively. This RBAC is facilitated through a permission model based on Actions and Resources.


## Authentication
Users in the system are considered as independent entities. Registration and authentication are vital to establish the identity of a valid user. Here's how the authentication process works:

Authentication Provider: Azure B2C is used for user authentication.
Sign-Up Methods: Users can sign up using various methods, including:

* Email & Password
* Google
* Microsoft
* More providers to be added


## Authorization

__Role Assignment__: Authorization determines what actions a user can perform based on their assigned role within a company. For instance, a user might be designated as an agronomist for a specific Agricultural Retailer.

__Access Control List (ACL)__: This list defines the permissions assigned to each role. Each permission is a combination of an Action and a Resource. For example, an agronomist’s ACL may include: "Read.Order", "Create.Order", "Update.Order", "Delete.Order", etc.

__Permissions__: Permissions are made up of Actions and Resources. Actions define the type of operation a user can perform such as Create, Read, Update, Delete, while Resources define the entity on which the action can be performed such as Order, User, Product, etc. This allows for precise control over what each role can do.

__Selected Role__: Users may be linked with multiple roles across various companies, like an agronomist working for several retailers.

 __Hierarchy__: In situations where companies have subsidiaries, users in higher roles at the parent company might have specific access rights to the resources in those subsidiaries.

## Example Scenarios:

__Scenario 1__: Sales Manager Creating an Order
A Sales Manager for an Ag Retailer needs to create an order. Authorization requires:

1. The Sales Manager role, revealing the company ID.
2. The retailer company ID for which the order is being created.
3. The permission "Create.Order" in the Sales Manager's ACL.

If all conditions are met, the system authorizes the order creation.

__Scenario 2__: Admin Adding a Warehouse Location
An Admin of a parent company wants to add a warehouse to a subsidiary. Authorization needs:

1. The role, providing the parent company ID.
2. The subsidiary's company ID.
3. The permission "Create.Warehouse" in the Admin's ACL.

With this information, the system verifies the parent-child relationship and checks the ACL associated with the parent company's role. If all conditions are satisfied, the system authorizes the warehouse creation

__Scenario 3__: Company Admin Updating User Profile
A Company Admin wants to update the profile of a user under the same company. Authorization requires:

1. The Company Admin role, revealing the company ID.
2. The company ID associated with the user whose profile is being updated.
3. The permission "Update.UserProfile" in the Company Admin's ACL.

If all conditions are met, the system authorizes the user profile update

## Walkthrough Guide

This guide assumes you're familiar with the basic setup of a GraphQL server and Prisma. We'll go through the process of checking the permissions for a mutation operation, specifically updateUserProfile which allows a Company Admin to update a user's profile.

### Step 1: Define your ACL
Here's how you define an Access Control List (ACL) for a role. In this case, we're defining it for the Company Admin:

```typescript
import { Action, Resource, buildPermission } from '../../models/Action'
import { RoleName } from '../../models/RoleName'

export const ACL = {
  [RoleName.CompanyAdmin]: [
    buildPermission(Action.Update, Resource.UserProfile),
    // add other permissions as necessary
  ],
  // ACL for other roles
}

```

### Step 2: Define the mutation
Define your GraphQL mutation:

```graphql
type Mutation {
  updateUserProfile(input: UserProfileUpdateInput!): UserProfile
}
```

### Step 3: Add permission check to the mutation resolver
In your resolver for the mutation, use the `checkAuthorization` function to check if the user is authorized to perform the action:


```typescript
import checkAuthorization from '../../authorization/checkAuthorization'

const resolvers = {
  Mutation: {
    updateUserProfile: checkAuthorization(
      [buildPermission(Action.Update, Resource.UserProfile)],
      args => args.input.companyId,
    )(async (root, args, context, info) => {
      // implement your resolver logic here
    }),
  },
}
```

