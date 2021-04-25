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
                            date: '10/01/2020 15:30',
                            text: 'Hai portato a spasso il cane?',
                            status: 'sent',
                        },
                        {
                            hasOptionsOpen: false,
                            date: '10/01/2020 15:50',
                            text: 'Ricordati di dargli da mangiare',
                            status: 'sent',
                        },
                        {
                            hasOptionsOpen: false,
                            date: '10/01/2020 16:15',
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
                            date: '20/03/2020 16:30',
                            text: 'Ciao come stai?',
                            status: 'sent',
                        },                        
                        {
                            hasOptionsOpen: false,
                            date: '20/03/2020 16:30',
                            text: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received',                            
                        },
                        {
                            hasOptionsOpen: false,
                            date: '20/03/2020 16:35',
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
                            date: '28/03/2020 10:10',
                            text: 'La Marianna va in campagna',
                            status: 'received',
                        },
                        {
                            hasOptionsOpen: false,
                            date: '28/03/2020 10:20',
                            text: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent',
                        },
                        {
                            hasOptionsOpen: false,
                            date: '28/03/2020 16:15',
                            text: 'Ah scusa!',
                            status: 'received',
                        }
                    ],
                },
                {
                    name: 'Irene',
                    avatar: '_4',
                    visible: true,
                    lastAccess: '',
                    messages: [
                        {
                            hasOptionsOpen: false,
                            date: '10/01/2020 15:30',
                            text: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent',
                        },
                        {
                            hasOptionsOpen: false,
                            date: '10/01/2020 15:50',
                            text: 'Si, ma preferirei andare al cinema',
                            status: 'received',        
                        }
                    ],
                },
                {
                    name: 'Mattia',
                    avatar: '_5',
                    visible: true,
                    lastAccess: '',
                    messages: [
                        {
                            hasOptionsOpen: false,
                            date: '10/01/2020 19:10',
                            text: 'Domani andiamo a giocare a pallone con Francesco',
                            status: 'received',
                        },
                        {
                            hasOptionsOpen: false,
                            date: '10/01/2020 19:50',
                            text: 'Si alle 18 che prima ho lezione',
                            status: 'sent',        
                        },
                        {
                            hasOptionsOpen: false,
                            date: '10/01/2020 15:30',
                            text: 'Ok!',
                            status: 'received',
                        }
                    ],
                },
                {
                    name: 'Luisa',
                    avatar: '_6',
                    visible: true,
                    lastAccess: '',
                    messages: [
                        {
                            hasOptionsOpen: false,
                            date: '10/01/2020 15:30',
                            text: 'Ciao Luisa, hai preso appunti alla lezione di ieri?',
                            status: 'sent',
                        },
                        {
                            hasOptionsOpen: false,
                            date: '10/01/2020 15:50',
                            text: 'Si, quando arrivo a casa te li mando',
                            status: 'received',        
                        },
                        {
                            hasOptionsOpen: false,
                            date: '10/01/2020 15:50',
                            text: 'Grazie!',
                            status: 'sent',        
                        }
                    ],
                },
                {
                    name: 'Francesco',
                    avatar: '_7',
                    visible: true,
                    lastAccess: '',
                    messages: [
                        {
                            hasOptionsOpen: false,
                            date: '10/01/2020 15:30',
                            text: 'Ci sei per andare al campetto domani?',
                            status: 'sent',
                        },
                        {
                            hasOptionsOpen: false,
                            date: '10/01/2020 15:50',
                            text: 'Si',
                            status: 'received',        
                        }
                    ],
                },
                {
                    name: 'Gabriele',
                    avatar: '_8',
                    visible: true,
                    lastAccess: '',
                    messages: [
                        {
                            hasOptionsOpen: false,
                            date: '10/01/2020 15:30',
                            text: 'Ciao, hai gli appunti della lezione di oggi?',
                            status: 'received',
                        },
                        {
                            hasOptionsOpen: false,
                            date: '10/01/2020 15:50',
                            text: 'Eh no! Dopo provo a chiedere a Luisa',
                            status: 'sent',        
                        }
                    ],
                }
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
                        date: dayjs().format('DD/MM/YYYY HH:mm'),
                        text: this.newMessage,
                        status: 'sent',                        
                    });

                    // I call the function Autorespond after 1s
                    setTimeout(this.autorespond, 1000)

                    // Everytime I send a new message, I filter the array of messages to remove
                    // the empty pseudomessage that I push when deleting the last message
                    this.contacts[this.activeContactIndex].visible = true;
                    let newcontactMessages = this.contacts[this.activeContactIndex].messages.filter((message) => {
                        return message.status != 'hide';
                    })

                    this.contacts[this.activeContactIndex].messages = newcontactMessages
                }                            
                this.newMessage = '';                                
            },
            autorespond() {
                this.contacts[this.activeContactIndex].messages.push({
                    hasOptionsOpen: false,
                    date: dayjs().format('DD/MM/YYYY HH:mm'),
                    text: 'ok',
                    status: 'received'
                });
                // I Refresh last Access
                this.findLastAccess()
            },                      
            // To find contacts
            findContact() {                                              
                this.contacts.forEach((element, index) => {                                        
                    if(element.name.toLowerCase().includes(this.searchQuery.toLowerCase())) {                            
                        if(this.searchQuery == '' && this.lastMessageProperty(index, 'text') == '') {
                            element.visible = false;
                        } else {
                            element.visible = true
                        }                                                                  
                                                
                    } else {                        
                        element.visible = false;                                            
                    }
                })
            },
            // To Find a property of last message for each contact
            // index --> the index of the contact you want to find the last message
            // property --> is a String that represents which property of the object 
            //              'message' do you want (date, text, status, hasOptionOpen)
            // return: a string representing the property of last message of that contact
            lastMessageProperty(index, property) {  
                let thisContact = this.contacts[index]                                         
                let lastMex = thisContact.messages[thisContact.messages.length - 1][property];
                return lastMex;                                               
            },
            // To Print The last message
            // index --> the index of the contact you want to print the last message
            // return: a string that represents last message            
            printLastMessage(index) {
                let mexToPrint = this.lastMessageProperty(index, 'text');    
                return mexToPrint;                        
            },
            // To print last access for each contact:
            // I want the last acces to be the date of the last message received from a specific contact.            
            // return: none --> This function refresh lastAccess property of contacts.
            findLastAccess() {               
                this.contacts.forEach((contact) => {                    
                    let i = contact.messages.length - 1;
                    let lastMessageReceivedDate = '';
                    let isMessageReceived = false;

                    while(isMessageReceived == false && i >= 0) {
                        let thisMessage = contact.messages[i];
                        
                        if(thisMessage.status == 'received') {                            
                            isMessageReceived = true;
                            
                            lastMessageReceivedDate = thisMessage.date
                        }
                        i--;
                    }
                    contact.lastAccess = lastMessageReceivedDate;
                })                
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
                                                                
                if(thisContactMessages.length > 1) {
                    thisContactMessages.splice(index, 1);
                } else {

                    this.contacts[this.activeContactIndex].visible = false;

                    thisContactMessages.splice(index, 1);
                    thisContactMessages.push({
                        hasOptionsOpen: false,
                        date: '',
                        text: '',
                        status: 'hide',
                    })
                }               
                                            
            }            
            
        },
        created() {
            this.findLastAccess()
        }

    }
);