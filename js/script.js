var app = new Vue(
    {
        el: '#root',
        data: {
            activeContactIndex: '0',
            newMessage: '',
            searchQuery: '',            
            contacts: [
                {                    
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    lastAccess: '',
                    messages: [                        
                        {
                            hasOptionsOpen: false,
                            date: '10/01/2020 15:30:55',
                            text: 'Hai portato a spasso il cane?',
                            status: 'sent',
                        },
                        {
                            hasOptionsOpen: false,
                            date: '10/01/2020 15:50:00',
                            text: 'Ricordati di dargli da mangiare',
                            status: 'sent',
                        },
                        {
                            hasOptionsOpen: false,
                            date: '10/01/2020 16:15:22',
                            text: 'Tutto fatto!',
                            status: 'received',
                        }
                    ],                    
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    lastAccess: '',
                    messages: [
                        {
                            hasOptionsOpen: false,
                            date: '20/03/2020 16:30:00',
                            text: 'Ciao come stai?',
                            status: 'sent',
                        },                        
                        {
                            hasOptionsOpen: false,
                            date: '20/03/2020 16:30:55',
                            text: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received',                            
                        },
                        {
                            hasOptionsOpen: false,
                            date: '20/03/2020 16:35:00',
                            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent',
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    lastAccess: '',
                    messages: [
                        {
                            hasOptionsOpen: false,
                            date: '28/03/2020 10:10:40',
                            text: 'La Marianna va in campagna',
                            status: 'received',
                        },
                        {
                            hasOptionsOpen: false,
                            date: '28/03/2020 10:20:10',
                            text: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent',
                        },
                        {
                            hasOptionsOpen: false,
                            date: '28/03/2020 16:15:22',
                            text: 'Ah scusa!',
                            status: 'received',
                        }
                    ],
                },
                {
                    name: 'Luisa',
                    avatar: '_4',
                    visible: true,
                    lastAccess: '',
                    messages: [
                        {
                            hasOptionsOpen: false,
                            date: '10/01/2020 15:30:55',
                            text: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent',
                        },
                        {
                            hasOptionsOpen: false,
                            date: '10/01/2020 15:50:00',
                            text: 'Si, ma preferirei andare al cinema',
                            status: 'received',        
                        }
                    ],
                },
            ]
        },
        methods: {
            // To pass the index to activeContactIndex and print images and messages
            showIndex(index) {
                this.activeContactIndex = index;                                        
            },           
            // To send a new message
            sendMessage() {    
                if (this.newMessage.length > 0) {
                    this.contacts[this.activeContactIndex].messages.push({
                        hasOptionsOpen: false,
                        date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                        text: this.newMessage,
                        status: 'sent',                        
                    });
                }                            
                this.newMessage = '';

                // I call the function Autorespond after 1s
                setTimeout(this.autorespond, 1000)
            },
            autorespond() {
                this.contacts[this.activeContactIndex].messages.push({
                    hasOptionsOpen: false,
                    date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                    text: 'ok',
                    status: 'received'
                });
            },                      
            // To find contacts
            findContact() {                
                this.contacts.forEach((element) => {
                    if(element.name.toLowerCase().includes(this.searchQuery.toLowerCase())) {
                        element.visible = true;
                    } else {
                        element.visible = false;
                    }
                })
            },
            // To Find last message for each contact
            // index --> the index of the contact you want to find the last message
            // property --> is a String that represents which property of the object 
            //              'message' do you want (date, text, status)
            // return: a string representing the property of last message of that contact
            lastMessage(index, property) {  
                let thisContact = this.contacts[index]                                         
                let lastMex = thisContact.messages[thisContact.messages.length - 1][property];
                return lastMex;                                               
            },
            // To Print The last message
            // index --> the index of the contact you want to print the last message
            // return: a string that represents last message            
            printLastMessage(index) {
                let mexToPrint = this.lastMessage(index, 'text');    
                return mexToPrint;                        
            },
            // To print last access for each contact:
            // I want the last acces to be the date of the last message received from a specific contact.
            // return: a string representing the date of last message received (== last access)
            lastAccess(index) {
                const contact = this.contacts[index];
                const lastMessageStatus = this.lastMessage(index, 'status');
                const lastMessageDate = this.lastMessage(index, 'date');

                // If The last message is received, I return the date
                if(lastMessageStatus != 'sent') {
                    return lastMessageDate;
                } else {
                    // Only If the last message is sent: 
                    let lastMessageReceivedDate = function () {

                        // I look for the date of last message received:
                        // I go backward on the array of messages until i find a message received and I pick the date
                        let dateLastMessage = '';
                        let i = contact.messages.length - 1;
                        let isMessageReceived = false;
                        while(isMessageReceived == false && i > 0 ) {
                            const thisMessageStatus = contact.messages[i].status;
                            const thisMessageDate = contact.messages[i].date;
                            
                            if(thisMessageStatus == 'received') {
                                isMessageReceived = true;
                                dateLastMessage = thisMessageDate;
                            }

                            i--
                        }
                        
                        return dateLastMessage;
                    }                 
                    return lastMessageReceivedDate();
                }

                
            },                
            openOptions(message) {
                this.contacts[this.activeContactIndex].messages.forEach((element) => {
                    if (element != message) {
                        element.hasOptionsOpen = false;
                    }                         
                })                

                if (message.hasOptionsOpen == true) {
                    message.hasOptionsOpen = false;
                } else {
                    message.hasOptionsOpen = true;
                }
                                            
            },
            deleteMessage(index) {                
                let thisContactMessages = this.contacts[this.activeContactIndex].messages; 

                let newContactMessages = [
                    ...thisContactMessages
                ]

                newContactMessages.splice(index, 1);  
                thisContactMessages.splice(index, 1);
            }            
            
        }

    }
);


/* TODO:
    - Ripensare alla maniera in cui vengono visualizzate le opzioni (toggle e su altri clic di icone) 
    - destrutturare l'array e pensare a come non modificare l'ultimo accesso quando rimuovo
      un messaggio
-*/ 