<template>

  <div id="paypal-buttons"></div>
</template>

<script lang="ts">
import { loadScript } from "@paypal/paypal-js";
import { nextTick, defineComponent, onMounted, watch } from 'vue';
import axios from 'axios';
import { ElLoading, ElNotification } from 'element-plus';

export default defineComponent({
  name: 'Paypal',
  props:{
    totalAmount: Number,
    eventId: String,
    eventKey: String,
    coins: Number,
    objectSelected: Object,
    category: String
  },
  setup(props){
    let buttonRendered = true;

    onMounted( async()=>{

      await nextTick(()=>{
        constructButton()
      })
    })

    // Watch for changes in props
    watch(() => [props.eventId, props.totalAmount], ([newEventId, newTotalAmount], [oldEventId, oldTotalAmount]) => {
      if (!buttonRendered && newEventId !== null && newTotalAmount !== null) {
        // Construct the PayPal button when both props are not null and the button has not been rendered yet
        constructButton()
      }
    })

    const constructButton =async ()=>{
      await loadScript({
        clientId: "AQYoQ-OpzpzSfIhZcz-iasnJ6GUEBAvk818FQf4JyuhasqTkvMLhVp4dPa9UXIbkZ9W0qvdXMRa2u_dv",
        disableFunding:['credit','card'] // 禁止出现的按钮
      })
          .then((paypal) => {
            if (paypal?.Buttons) {
              paypal
                  .Buttons({
                    style: { // 按钮样式自定义
                      height: 40,
                    },
                    createOrder: (data, actions) => {
                      if (props.eventId && props.totalAmount) {
                        console.log("Passed in transaction: ");
                        console.log({
                          eventId: props.eventId,
                          coin: props.coins,
                          price: Number(props.totalAmount),
                          notes: props.category
                        })
                        // Make the first axios request to paySingleOrder
                        axios.post(
                            `https://secourse2024-675d60a0d98b.herokuapp.com/api/paySingleOrder`,
                            {
                              eventId: props.eventId,
                              coin: props.coins,
                              price: Number(props.totalAmount),
                              notes: props.category
                            },{
                              //AxiosRequestConfig parameter
                              withCredentials: true //correct
                            }
                        )
                            .then((response) => {
                              // Check the response status
                              const status = response.status;
                              console.log(status);

                              // If the response status is okay, proceed to book the seats
                              if (status === 200) {
                                // Make the axios request to book the seats
                                if(props.eventKey){
                                  console.log("Seatsio booking: ",props.objectSelected, " in ", props.eventKey)
                                  axios.post(
                                      `https://api-oc.seatsio.net/events/${props.eventKey}/actions/book`,
                                      {
                                        objects: props.objectSelected,
                                      },
                                      {
                                      auth: {
                                        username: useRuntimeConfig().public.seatsioKey
                                      }
                                      }
                                  )
                                      .then((bookingResponse) => {
                                        console.log("Return URL link",response.data.forwardLink);

                                        // After booking the seats, navigate to the forward link
                                        navigateTo(response.data.forwardLink, {
                                          external: true,
                                          open: {
                                            target: '_blank',
                                          }
                                        });
                                      })
                                      .catch((error) => {
                                        axios.post(
                                            `https://api-oc.seatsio.net/events/${props.eventKey}/actions/release`,
                                            {
                                              objects: props.objectSelected,
                                            },
                                            {
                                              auth: {
                                                username: useRuntimeConfig().public.seatsioKey
                                              }
                                            }
                                        ).then((bookingResponse) => {
                                          console.log("Release success", bookingResponse)
                                        })

                                        ElNotification.error({
                                          title: 'Error',
                                          message: "Error in payment"+error,
                                          duration: 5000, // Duration in milliseconds
                                          offset: 100 // Notification offset from top
                                        });
                                        console.error('Error booking seats:', error);
                                      });
                                } else {
                                  // if there is no seatsio mechanism, directly move to forward link
                                  console.log("Return URL link",response.data.forwardLink);

                                  navigateTo(response.data.forwardLink, {
                                    external: true,
                                    open: {
                                      target: '_blank',
                                    }
                                  });
                                }

                              } else {

                                ElNotification.error({
                                  title: 'Error',
                                  message: "Error in server",
                                  duration: 5000, // Duration in milliseconds
                                  offset: 100 // Notification offset from top
                                });
                                console.error('Error paying for order:', response.data);
                              }
                            })
                            .catch((error) => {
                              axios.post(
                                  `https://api-oc.seatsio.net/events/${props.eventKey}/actions/release`,
                                  {
                                    objects: props.objectSelected,
                                  },
                                  {
                                    auth: {
                                      username: useRuntimeConfig().public.seatsioKey
                                    }
                                  }
                              ).then((bookingResponse) => {
                                console.log("Release success", bookingResponse)
                              })
                              console.error('Error paying for order:', error);
                              ElNotification.error({
                                title: 'Error',
                                message: `Error paying for order ${error.message}`,
                                offset: 100 // Notification offset from top
                              });
                            });
                      }
                    },
                    onApprove: (data, actions) => {
                      // 获得订单id去付款接口

                    },
                    onCancel(data){
                      console.log('取消');
                    }
                  })
                  .render("#paypal-buttons")
                  .catch((error) => {
                    console.error("failed to render the PayPal Buttons", error);
                    ElNotification.error({
                      title: 'Error',
                      message: `Failed to render the PayPal Buttons ${error.message}`,
                      offset: 100 // Notification offset from top
                    });
                  });
            }
          })
          .catch((error) => {
            console.error("failed to load the PayPal JS SDK script", error);
            ElNotification.error({
              title: 'Error',
              message: `failed to load the PayPal JS SDK script ${error.message}`,
              offset: 100 // Notification offset from top
            });
          });
    }
  }
})
</script>
