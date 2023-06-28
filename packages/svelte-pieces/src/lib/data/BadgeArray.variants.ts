import type { Variants } from 'kitbook';
import type Component from './BadgeArray.svelte';

const books = ['Lord of the Rings', 'www.books.com'];

export const variants: Variants<Component> = [
  {
    name: 'Basic display',
    props: {
      strings: books,
      promptMessage: "What is the book name?",
      addMessage: "Add Book"
    },
  },
  // rtl
  {
    name: 'Editable',
    props: {
      canEdit: true,
      strings: books,
      promptMessage: "What is the book name?",
      addMessage: "Add Book"
    },
  },
  // editable rtl
  {
    name: "handles strings",
    props: {
      strings: "How about this?"
    }
  }
]

// automatically log events
// on:valueupdated={(e) => console.log('valueupdated', e.detail)}



