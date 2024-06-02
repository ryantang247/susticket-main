---
title: Nuxt Content Example
description: An example for the new @nuxt/content and @nuxt/components modules
---

<div align="center">
<h1>Main Page Documentation</h1>
<!-- <img src="../assets/logo2.png" width="300" alt="logo"/> -->
<!-- <h3>Welcome to Admin Page Documentation!</h3> -->
<h4>Following documentation will guide you to understand Main Page code structure and component.</h4>

</div>

<link href="../assets/main.css" rel="stylesheet"></link>

## Profile

Profile component, gateway for login and logout

::Profile
---
isVisible: True
---
::
<pre>



















</pre>

## AMap

Map component that renders the venue in their given coordinatess.

::AMap
::


## Calendar

Calender component, powered using ElementPlus.

::Calender
::

## CategoryMenu

::CategoryMenu
::

### Props

| Prop Name        | Type    | Description                          |
| ---------------- | ------- | ------------------------------------ |
| `categories`     | Array   | List of categories with name and icon. |
| `selectedCategory` | Object | The currently selected category.      |

### Methods

#### `selectCategory(category)`

**Description**: Selects the given category and emits a `category-selected` event.

**Parameters**:
- `category` (Object): The category to select.

**Usage Example**:
```javascript
this.selectCategory({ name: 'Competition', icon: competitionIcon });
```

## Customer Service
Customer service component which is floating currently, it utilizes React converter to achieve and powered by Chat-EngineIO

Note that in nuxt.config.ts, to run in dev mode, the following code must be commented out, and commented back in when pushed for development.

![customerservice](../assets/customerservice.png)

## EventCard

::EventCard
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

## EventFilter

::EventFilter
::

### EventFilter Methods:

#### `selectFilter(filter)`:
- Description: Filter based on the values in the defined array: ['All', 'This week', 'This month', 'Next month'], 
- Parameters:
    - `filter`: String - String from the array above.

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

### EventList Props

| Prop Name | Type | Description |
| --------- | ---- | ----------- |
| `events`  | Array | List of events to display. Each event contains details like `id`, `event`, `status`, `available`, and more. |

### EventList Methods

#### `toggleBookmark(event)`

**Description**: Toggles the bookmark state for an event and sends a request to the server to update the bookmark status.

**Parameters**:
- `event` (Object): The event object for which the bookmark state needs to be toggled.

#### `bookmarkSrc(event)`

**Description**: Returns the source of the bookmark icon based on the event's bookmark state.

**Parameters**:
- `event` (Object): The event object to check the bookmark state.

#### `copyLink(event)`

**Description**: Copies the event's link to the clipboard and shows a notification.

**Parameters**:
- `event` (Object): The event object whose link needs to be copied.

#### `formatDate(dateString)`

**Description**: Formats the event date string into a human-readable format.

**Parameters**:
- `dateString` (String): The date string to format.

#### `getVenueName(venueId)`

**Description**: Retrieves the venue name based on the provided venue ID.

**Parameters**:
- `venueId` (Number): The ID of the venue.

#### `displayPrice(priceJson)`

**Description**: Parses and formats the event's price JSON string.

**Parameters**:
- `priceJson` (String): The JSON string containing the price information.


## Footer

::Footer
::

## Header

::Header
::

### Props

#### `isVisible`
- **Type**: Boolean
- **Usage**: Determines whether the notification or profile pop-up is visible.

#### `coinVal`:
- **Type**: Number
- **Usage**: Represents the number of coins the user has, used to display the coin balance in the sidebar.

### Methods

#### `toggleSidebar`

**Description**: Toggles the visibility of the sidebar.
**Parameters**: None.
- **Code**:
  ```javascript
  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
  };
    ```

#### `toggleProfileBox`
**Description**: Toggles the visibility of the profile pop-up and ensures the notification pop-up is closed if open.
**Parameters**: None.
**Code**:
  ```javascript
  function toggleProfileBox() {
    showProfileBox.value = !showProfileBox.value;
    if (showNotifBox.value) {
      showNotifBox.value = false;
    }
  }
  ```

#### `toggleNotifBox`
**Description**: Toggles the visibility of the notification pop-up and ensures the profile pop-up is closed if open.
**Parameters**: None.
**Code**:
  ```javascript
  function toggleNotifBox() {
    showNotifBox.value = !showNotifBox.value;
    if (showProfileBox.value) {
      showProfileBox.value = false;
    }
  }
  ```

#### `goToCalendar`
**Description**: Navigates the user to the calendar page.
**Parameters**: None.
**Code**:
  ```javascript
  const goToCalendar = () => {
    router.push('/calendar/calendarPage');
  };
  ```

#### `goToCart`
**Description**: Navigates the user to the cart page.
**Parameters**: None.
**Code**:
  ```javascript
  const goToCart = () => {
    router.push('/myCart');
  };
  ```

#### `goToTickets`
**Description**: Navigates the user to the tickets page.
**Parameters**: None.
**Code**:
  ```javascript
  const goToTickets = () => {
    router.push('/myTickets');
  };
  ```
#### `goToBookmarks`
**Description**: Navigates the user to the bookmarks page.
**Parameters**: None.
**Code**:
  ```javascript
  const goToBookmarks = () => {
    router.push('/bookmark/bookmarkPage');
  };
  ```

####  `goToHomepage`
**Description**: Navigates the user to the homepage.
**Parameters**: None.
**Code**:
  ```javascript
  function goToHomepage() {
    router.push('/');
  }
  ```

#### `goToLogin`
**Description**: Navigates the user to the login page.
**Parameters**: None.
**Code**:
  ```javascript
  const goToLogin = () => {
    router.push('/login');
  };
  ```

#### `logout`
**Description**: Logs out the user by clearing cookies and local storage, and redirects to the login page.
**Parameters**: None.
**Code**:
  ```javascript
  const logout = () => {
    console.log("User logout successfully");
    const cookie = useCookie('secourse');
    cookie.value = null;
    if (process.client) {
      localStorage.setItem("Username", null);
      localStorage.setItem("Avatar", null);
      localStorage.setItem("Email", null);
      localStorage.setItem("Status", null);
    }
    router.push('/login');
  };
  ```

#### `getCoins`
**Description**: Fetches the user's coin balance from the server.
**Parameters**: None.
**Code**:
  ```javascript
  const getCoins = async () => {
    const response = await fetch('https://secourse2024-675d60a0d98b.herokuapp.com/api/getUser', { credentials: 'include' });
    const userDetails = await response.json();
    userCoin = userDetails.coin;
    coinVal = userDetails.coin;
  };
  ```

#### `fetchNotificationsCount`
**Description**: Fetches the count of notifications for the user from the server.
**Parameters**: None.
**Code**:
  ```javascript
  const fetchNotificationsCount = async () => {
    try {
      const response = await axios.get('https://secourse2024-675d60a0d98b.herokuapp.com/api/getNotifications', { withCredentials: true });
      notificationsCount.value = response.data.length; 
    } catch (error) {
      console.error('Failed to fetch notifications: ', error);
      ElNotification.error({
        title: 'Error',
        message: `Error fetching notifications. ${error.message}`,
        offset: 100,
      });
    }
  };
  ```



## HeaderLogin

::HeaderLogin
::


## MyTicketCard
Component for rendering the events that I have put in the cart

::MyTicketCard
---
transactions: [{
"id": 1,
"event": {
"title": "Sample Event 1",
"startDate": "2024-06-01T09:00:00Z",
"venueId": "497b1133-9b18-4760-966f-df1dbae0e48a",
"available": 100
},
"seat": "A12",
"price": 50,
"bookmarked": false
}]
---
::

### MyTicketCard Props:

#### `transactions`:
- Type: Array
- Description: Array of transaction objects representing tickets purchased by the user.

#### `events`:
- Type: Array
- Description: Array of event objects.

### MyTicketCard Methods:

#### `formatDate(dateString)`:
- Description: Formats a date string into a readable format with both date and time.
- Parameters:
   - `dateString`: String - A date string to be formatted.
- Returns: String - Formatted date and time string.

#### `getVenueName(venueId)`:
- Description: Retrieves the name of the venue based on the venue ID.
- Parameters:
   - `venueId`: String or Number - ID of the venue to retrieve the name for.
- Returns: String - Name of the venue.

#### `displayPrice(priceJson)`:
- Description: Displays the price in a beautiful UI format. Handles both single and multiple prices.
- Parameters:
   - `priceJson`: String - JSON string representing the prices.
- Returns: String - Formatted price or price range.

#### `goToReview(eventId)`:
- Description: Navigates the user to the review page for a specific event.
- Parameters:
   - `eventId`: String or Number - ID of the event to navigate to for review.

#### `copyLink(event)`:
- Description: Copies the link of the event to the clipboard.
- Parameters:
   - `event`: Object - Event object containing the link to be copied.

## NotifPopup
::NotifPopup
isVisible: true
::

### Props:
`calendarVal`: A reactive reference to the currently selected date in the calendar.
`calendarData`: A reactive reference to an array of objects representing the data to be displayed on the calendar. Each object contains:
`date`: The date of the event.
`visits`: The number of visits on that date.
`type`: The type of event (used for styling).
### Methods:
`getDate`(day): A method that formats a given date to return the day of the month.
`selectedDate`(data): A method that handles the click event on a date cell. It finds the corresponding data in calendarData and emits a selectedDate event with the data.

## Paypal Button

Paypal button that redirects to the Paypal gateway webpage, skips if the selected items' price is zero.

::PayPal
---
totalAmount: 20
eventId: lollolo
---
::

### Paypal Props

- `totalAmount` (Number): The total amount to be paid.
- `eventId` (String): The unique identifier for the event.
- `eventKey` (String): The key for booking the event.
- `coins` (Number): The number of coins involved.
- `objectSelected` (Object): The selected object(s) for the event.
- `category` (String): The category of the event.

### PaypalMethods

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


## WelcomeBanner

The welcome banner in our main page.

::WelcomeBanner
::



