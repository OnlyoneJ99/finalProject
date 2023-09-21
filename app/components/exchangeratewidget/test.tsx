const response = await fetch("http://localhost:3000/api/recipient",{method: "POST",body:JSON.stringify({recipientphonenumber}),headers:{"Content-Type":"application/json"}});
          const user = await response.json();
          const {firstname,lastname,phonenumber} = user.user;
          let account_number = phonenumber as string;
          account_number = account_number.replace("233","0");

          const recipient = {
            type:transfermethod,
            name:`${firstname} ${lastname}`,
            account_number:account_number,
            bank_code:selectedtelco.current,
            currency:currencies.to
          }

          const recipientresponse = await fetch("https://api.paystack.co/transferrecipient",{method:"POST",body:JSON.stringify(recipient),headers:{"Authorization": `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET}`}});
          const data = await recipientresponse.json();
          const transfer_reference = crypto.randomUUID();
          const recipient_code= data.data.recipient_code;

          const transferdetails = { 
            source: "balance", 
            amount: 180000,
            recipient: recipient_code,
            reference: transfer_reference,
            currency:currencies.to
          };

          console.log(transferdetails);
          try{
            const response = await fetch("https://api.paystack.co/transfer",
                                      {
                                        method:"POST",
                                        body:JSON.stringify(transferdetails),
                                        headers:{"Content-Type":"application/json","Authorization": `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET}`
                                      }}
                                    );
            console.log(response)
          }catch(error){
            console.log(error);
          }