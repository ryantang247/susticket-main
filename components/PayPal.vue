<template>
  <div id="paypal-buttons"></div>
</template>

<script lang="ts">
import { loadScript } from "@paypal/paypal-js";
import { nextTick, defineComponent, onMounted, watch } from 'vue'
import axios from 'axios';
import userconfig from '@/userconfig.json';


export default defineComponent({
  name: 'Paypal',
  props:{
    totalAmount: Number,
    eventId: String,
    eventKey: String,
    objectSelected: Object
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
                        console.log(props.eventId, props.totalAmount);
                        // Make the first axios request to paySingleOrder
                        axios.post(
                            `https://secourse2024-675d60a0d98b.herokuapp.com/api/paySingleOrder`,
                            {
                              eventId: props.eventId,
                              price: Number(props.totalAmount)
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
                                  axios.post(
                                      `https://api-oc.seatsio.net/events/${props.eventKey}/actions/book`,
                                      {
                                        objects: props.objectSelected,
                                      },
                                      {
                                        auth: {
                                          username: userconfig.username,
                                          password: userconfig.password
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
                                console.error('Error paying for order:', response.data);
                              }
                            })
                            .catch((error) => {
                              console.error('Error paying for order:', error);
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
                  });
            }
          })
          .catch((error) => {
            console.error("failed to load the PayPal JS SDK script", error);
          });
    }
  }
})
</script>
