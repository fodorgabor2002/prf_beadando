import {menu_item} from "../model/menu_item";

export const Menu_items_admin: menu_item[]=[
  {
    title:'Search',
    url:'/home/trackSearch',
    icon:'search'
  },
  {
    title:'Manage Users',
    url:'/home/adminPanel',
    icon:'build'
  },
  {
    title:'Manage Tracks',
    url:'/home/trackAdminPanel',
    icon:'library_music'
  },
    {
    title:'Manage Playlists',
    url:'/home/playlists',
    icon:'playlist_add'
  },
  {
    title:'Manage Albums',
    url:'/home/albums',
    icon:'album'
  },
  
];

export const Menu_items_user: menu_item[]=[
  {
    title:'Search',
    url:'/home/trackSearch',
    icon:'search'
  },
    {
    title:'Manage Playlists',
    url:'/home/playlists',
    icon:'playlist_add'
  },
];
