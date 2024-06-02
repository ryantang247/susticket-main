---
title: Nuxt Content Example
description: An example for the new @nuxt/content and @nuxt/components modules
---

# This site is a quick overview on our Components, its functions and what do they do. I won't go into details, but hope you get a brief insight on what they do, happy coding! :)

## Calendar

Calander component, powered using ElementPlus.

::Calender
::

## Paypal Button

Paypal button that redirects to the Paypal gateway webpage, skips if the selected items' price is zero.

::PayPal
---
totalAmount: 20
eventId: lollolo
---
::

### Props

- `totalAmount` (Number): The total amount to be paid.
- `eventId` (String): The unique identifier for the event.
- `eventKey` (String): The key for booking the event.
- `coins` (Number): The number of coins involved.
- `objectSelected` (Object): The selected object(s) for the event.
- `category` (String): The category of the event.

### Methods

#### `constructButton`

Initializes and renders the PayPal button:
1. **Load PayPal Script**: Uses `loadScript` from `@paypal/paypal-js`.
2. **Render PayPal Button**: Customizes and sets up the button with:
    - `createOrder`: Makes a POST request to `paySingleOrder` API and handles seat booking.
    - `onApprove`: Placeholder for payment approval actions.
    - `onCancel`: Logs cancellation.

#### `OrderCreated`

When the button is clicked:
1. **Log Transaction Details**.
2. **Make Axios Request** to `paySingleOrder`.
3. **Handle Seat Booking** if `eventKey` is provided.
4. **Error Handling**: Catches errors, releases seats, and shows notifications.

## AMap

Map component that renders the venue in their given coordinatess.

::AMap
::



## Customer Service
Customer service component which is floating currently, it utilizes React converter to achieve and powered by Chat-EngineIO

Note that in nuxt.config.ts, to run in dev mode, the following code must be commented out, and commented back in when pushed for development.

![customerservice](../assets/customerservice.png)

## EventList

Component in main page, shows overview of events

::EventList
---
events: [
{
"title": "Sample Event",
"contactName": "John Doe",
"description": "This is a sample event description.",
"venueId": "497b1133-9b18-4760-966f-df1dbae0e48a",
"contact": "+1234567890",
"thumbnail": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCADqATkDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAECA//EACQQAQEBAAIBBAMBAQEBAAAAAAABESExQQISUXFhgZGxocHw/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAWEQEBAQAAAAAAAAAAAAAAAAAAEQH/2gAMAwEAAhEDEQA/AMriLyCKgg1gQwCgs4FTMOdutepjQak+FzMSVqgxZdRdPPIIvH5WzzGdBriphtTeAXg2ZjKA1pqKDUGZca3foBek8gFv8Ie3fKdA1qb8s7hoL6eLVt51FsAnql3Ut1M7AWbflLMDkEMX/F6/YjK/pADFQAUNA6alYagKk72m/j9p4Bq2fDDSYKLNXPNLoHE/NT6RYC31cJxZ3yWVM+aBYi/S2ZgiAsnYJx5D21vPmqrm3PTfpQQwyAC8JZvSKDni41ZrMuUVVl+Uz9w9v/1QWrZsZ5nFPHYH+JZyureQSF5M+fJ0CAfwRAVRBQA1DAWVUayoJUWoDpsxntPsueBV4+VxhdyAtv8AjOLGpIDMLbeGvbF4iozJfr/WukAVABAXAQXEAAASzVAZdO2WNordm+emFl7XcQSNZiFtv0C9w90nhJf4mA1u+GcJFwIyAqL/AOovwgGNfSRqdIrNa29M0gKCAojU9PAMjWXpckEJFNFEAAXEUBABYz6rZ0ureQc9vyt9XxDF2QAXtABcQAs0AZywkvluJbyipifas52DcyxjlZweAO0xri/hc+wZOEKIu6nSyeToVZyWXwvCg53gW81QQ7aTNAn5dGZJPs1UXURQAUEMCXQLZE93PRZ5hPTgNMrbIzKCm52LZwCs+2M8w2g3sjPuZAXb4IsMAUACzVUGM4/K+md6vEXUUyM5PDR0IxYe6ramih0VNBrS4xoqN8Q1BFQk3yqyAsioioAAKgDSJL4/jQIn5igLrPqtOuf6oOaxbMoAltUAhhIoJiiggrPu+AaOIxtAX3JbaAIaLwi4t9X4T3fg2AFtqcrUUarP20zUDAmqoE0WRBZPNVUVEAAAAVAC8kvih2DSKxOdBqs7Z0l0gI0mKAC4AuHE7ZtBriM+744QAAAAABAFsveIttBICyaikvy1+r/Cen5rWQHIBQa4rIDRqSl5qDWqziqgAAAATA7BpGdqXb2C2+J/UgAtRQBSQtkBWb6vhLbQAAAAAEBRAAAAAUbm+GZNdPxAP+ql2Tjwx7/wIgZ8iKvBk+CJoCXii9gaqZ/qqihAAAEVABGkBFUwBftNkZ3QW34QAAABFAQAVAAAAAARVkl8gs/43sk1jL45LvHArepk+E9XTG35oLqsmIKmLAEygKg0y1AFQBUXwgAAAoBC34S3UAAABAVAAAAAABAUQAVABdRQa1PcYyit2z58M8C4ouM2NXpOEGeWtNZUatiAIoAKIoCoAoG4C9MW6dgIoAIAAAAAAACKWAgL0CAAAALiANCKioNLgM1CrLihmTafkt1EF3SZ5ZVUW4mnIKvAi5fhEURVDWVQBRAAAAAAAAQFRVyAyulgAqCKlF8IqLsEgC9mGoC+IusqCrv5ZEUVOk1RuJfwSLOOkGFi4XPCoYYrNiKauosBGi9ICstM1UAAAAAAFQ0VcTBAXUGgIqGoKhKAzRRUQUAwxoSrGRpkQA/qiosOL9oJptMRRVZa0VUqSiChE6BqMgCwqKqIogAIAqKCKgKoogg0lBFuIKgAAAKNRlf2gqsftsEtZWoAAqAACKoMqAAeSoqp39kL2AqLOlE8rEBFQARYALhigrNC9gGmooLp4TweEQFFBFAECgIoAu0ifIAqAAA//9k=",
"seatsioChartKey": "sampleChartKey",
"seatsioEventsKey": "sampleEventsKey",
"startDate": "2024-06-01T09:00:00Z",
"endDate": "2024-06-01T17:00:00Z",
"videolink": null,
"registrationDate": new Date().toLocaleDateString(),
"price": "[{\"category\": \"Standard\", \"price\": 50 }, {\"category\": \"VIP\", \"price\": 100}]",
"category": 3,
"capacity": 500,
"status": 0
}
]
---
::






