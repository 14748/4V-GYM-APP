# 4V GYM - OpenAPI 1.0
API Specification for 4V GYM.
The purpose is to manage activities in the GYM

## Version: 1.0.0

### /activity-types

#### GET
##### Summary:

Finds Activities

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Any problem in the Server |

### /monitors

#### GET
##### Summary:

Find the available monitors

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Any problem in the Server |

#### POST
##### Summary:

Add a new Monitor to the GYM

##### Description:

Add a new Monitor to the GYM

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful operation |
| 400 | Any Error like validations |

### /monitors/{monitorId}

#### PUT
##### Summary:

Update an existing monitor

##### Description:

Update an existing monitor by Id

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| monitorId | path | Monitor id to Update | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful operation |
| 400 | Any other error, like validations |
| 404 | Monitor not found |

#### DELETE
##### Summary:

Deletes a Monitor

##### Description:

delete a monitor

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| monitorId | path | Monitor id to Delete | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 400 | Any other error, like validations |
| 404 | Monitor not found |

### /activities

#### GET
##### Summary:

Find the available activities

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| date | query | Date to filter, the format is dd-MM-yyyy | No | date |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Any problem in the Server |

#### POST
##### Summary:

Add a new Activity to the GYM

##### Description:

Add a new Activity to the GYM

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful operation |
| 400 | Any Error like validations |

### /activities/{activityId}

#### PUT
##### Summary:

Update an existing Activity

##### Description:

Update an existing activity by Id

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| activityId | path | Activity id to Update | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful operation |
| 400 | Any other error, like validations |
| 404 | Activity not found |

#### DELETE
##### Summary:

Deletes a Activity

##### Description:

delete a activity

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| activityId | path | Activity id to Delete | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 400 | Any other error, like validations |
| 404 | Activity not found |

## Application Explanation

The 4V GYM application consists of two main sections: Monitors and Activities. Each section allows for adding, removing, and updating its respective items.

### Monitors Section

![image](https://github.com/14748/4V-GYM-APP/assets/99936563/84517bfe-3485-4dc1-a7aa-0e171ccb1672)

In the Monitors section, you can:
- **Add a new monitor:** Fill in the monitor details and submit.
- **Update a monitor:** Select a monitor and edit their details.
- **Remove a monitor:** Select a monitor and delete them from the system.

### Activities Section

![image](https://github.com/14748/4V-GYM-APP/assets/99936563/0d795179-4ab2-417b-91a5-26444432daf0)

In the Activities section, you can:
- **Add a new activity:** Choose the type, monitor, and schedule for the new activity.
- **Update an activity:** Edit details of an existing activity.
- **Remove an activity:** Delete an activity from the schedule.
- **Limitation:** Only 3 activities are allowed per day.

### Deployment Instructions

#### API

1. Navigate to the API directory:  
   `cd ./api`
2. Start the Symfony server:  
   `symfony server:start`

#### Web

1. Navigate to the web directory:  
   `cd ./web`
2. Start the Angular server:  
   `ng s`
