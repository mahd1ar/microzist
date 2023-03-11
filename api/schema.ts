import type { Lists } from '.keystone/types';

import {
    Category,
    Settings,
    User,
    File,
    Tag,
    CartItem,
    Cart,
    Order,
    OrderItem,
    Course,
    CourseItem,
    Coupon,
    Comment,
    Event,
    Teacher,
    Post,
} from './schemas';

export const lists: Lists = {
    User,
    Teacher,
    Coupon,
    Event,
    Post,
    Course,
    CourseItem,
    Category,
    Tag,
    File,
    Settings,
    CartItem,
    Cart,
    Order,
    OrderItem,
    Comment,
};
