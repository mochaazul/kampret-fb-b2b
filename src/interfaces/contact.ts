export interface ContactState {
  contact: Contact[]
  loading: boolean
}

export interface ContactReponse {
  results: Contact[]
}

export interface ContactCard {
  data: Contact
}

export interface Contact {
  name: {
    title: string,
    first: string,
    last: string
  },
  picture: {
    thumbnail: string
  },
  email: string
}
