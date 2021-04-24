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
                // I Refresh last Access
                this.findLastAccess()
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
                thisContactMessages.splice(index, 1);                            
            }            
            
        },
        created() {
            this.findLastAccess()
        }

    }
);