export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  CalendarDay: any;
  DateTime: any;
  JSON: any;
  Upload: any;
};

export type AuthenticatedItem = User;

export type BooleanFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<BooleanFilter>;
};

export type CalendarDayFilter = {
  equals?: InputMaybe<Scalars['CalendarDay']>;
  gt?: InputMaybe<Scalars['CalendarDay']>;
  gte?: InputMaybe<Scalars['CalendarDay']>;
  in?: InputMaybe<Array<Scalars['CalendarDay']>>;
  lt?: InputMaybe<Scalars['CalendarDay']>;
  lte?: InputMaybe<Scalars['CalendarDay']>;
  not?: InputMaybe<CalendarDayFilter>;
  notIn?: InputMaybe<Array<Scalars['CalendarDay']>>;
};

export type Cart = {
  __typename?: 'Cart';
  id: Scalars['ID'];
  isCompleted?: Maybe<Scalars['Boolean']>;
  items?: Maybe<Array<CartItem>>;
  itemsCount?: Maybe<Scalars['Int']>;
  summery?: Maybe<Scalars['String']>;
  totalPrice?: Maybe<Scalars['Float']>;
  user?: Maybe<User>;
};


export type CartItemsArgs = {
  orderBy?: Array<CartItemOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CartItemWhereInput;
};


export type CartItemsCountArgs = {
  where?: CartItemWhereInput;
};

export type CartCreateInput = {
  isCompleted?: InputMaybe<Scalars['Boolean']>;
  items?: InputMaybe<CartItemRelateToManyForCreateInput>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type CartItem = {
  __typename?: 'CartItem';
  cart?: Maybe<Cart>;
  coupon?: Maybe<Coupon>;
  course?: Maybe<Course>;
  event?: Maybe<Event>;
  id: Scalars['ID'];
  priceWithDiscount?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

export type CartItemCreateInput = {
  cart?: InputMaybe<CartRelateToOneForCreateInput>;
  coupon?: InputMaybe<CouponRelateToOneForCreateInput>;
  course?: InputMaybe<CourseRelateToOneForCreateInput>;
  event?: InputMaybe<EventRelateToOneForCreateInput>;
  quantity?: InputMaybe<Scalars['Int']>;
};

export type CartItemManyRelationFilter = {
  every?: InputMaybe<CartItemWhereInput>;
  none?: InputMaybe<CartItemWhereInput>;
  some?: InputMaybe<CartItemWhereInput>;
};

export type CartItemOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  quantity?: InputMaybe<OrderDirection>;
};

export type CartItemRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<CartItemWhereUniqueInput>>;
  create?: InputMaybe<Array<CartItemCreateInput>>;
};

export type CartItemRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<CartItemWhereUniqueInput>>;
  create?: InputMaybe<Array<CartItemCreateInput>>;
  disconnect?: InputMaybe<Array<CartItemWhereUniqueInput>>;
  set?: InputMaybe<Array<CartItemWhereUniqueInput>>;
};

export type CartItemUpdateArgs = {
  data: CartItemUpdateInput;
  where: CartItemWhereUniqueInput;
};

export type CartItemUpdateInput = {
  cart?: InputMaybe<CartRelateToOneForUpdateInput>;
  coupon?: InputMaybe<CouponRelateToOneForUpdateInput>;
  course?: InputMaybe<CourseRelateToOneForUpdateInput>;
  event?: InputMaybe<EventRelateToOneForUpdateInput>;
  quantity?: InputMaybe<Scalars['Int']>;
};

export type CartItemWhereInput = {
  AND?: InputMaybe<Array<CartItemWhereInput>>;
  NOT?: InputMaybe<Array<CartItemWhereInput>>;
  OR?: InputMaybe<Array<CartItemWhereInput>>;
  cart?: InputMaybe<CartWhereInput>;
  coupon?: InputMaybe<CouponWhereInput>;
  course?: InputMaybe<CourseWhereInput>;
  event?: InputMaybe<EventWhereInput>;
  id?: InputMaybe<IdFilter>;
  quantity?: InputMaybe<IntNullableFilter>;
};

export type CartItemWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type CartManyRelationFilter = {
  every?: InputMaybe<CartWhereInput>;
  none?: InputMaybe<CartWhereInput>;
  some?: InputMaybe<CartWhereInput>;
};

export type CartOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  isCompleted?: InputMaybe<OrderDirection>;
};

export type CartRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<CartWhereUniqueInput>>;
  create?: InputMaybe<Array<CartCreateInput>>;
};

export type CartRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<CartWhereUniqueInput>>;
  create?: InputMaybe<Array<CartCreateInput>>;
  disconnect?: InputMaybe<Array<CartWhereUniqueInput>>;
  set?: InputMaybe<Array<CartWhereUniqueInput>>;
};

export type CartRelateToOneForCreateInput = {
  connect?: InputMaybe<CartWhereUniqueInput>;
  create?: InputMaybe<CartCreateInput>;
};

export type CartRelateToOneForUpdateInput = {
  connect?: InputMaybe<CartWhereUniqueInput>;
  create?: InputMaybe<CartCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export type CartUpdateArgs = {
  data: CartUpdateInput;
  where: CartWhereUniqueInput;
};

export type CartUpdateInput = {
  isCompleted?: InputMaybe<Scalars['Boolean']>;
  items?: InputMaybe<CartItemRelateToManyForUpdateInput>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type CartWhereInput = {
  AND?: InputMaybe<Array<CartWhereInput>>;
  NOT?: InputMaybe<Array<CartWhereInput>>;
  OR?: InputMaybe<Array<CartWhereInput>>;
  id?: InputMaybe<IdFilter>;
  isCompleted?: InputMaybe<BooleanFilter>;
  items?: InputMaybe<CartItemManyRelationFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type CartWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Category = {
  __typename?: 'Category';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  parentId?: Maybe<Array<Category>>;
  parentIdCount?: Maybe<Scalars['Int']>;
  priority?: Maybe<Scalars['Int']>;
};


export type CategoryParentIdArgs = {
  orderBy?: Array<CategoryOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CategoryWhereInput;
};


export type CategoryParentIdCountArgs = {
  where?: CategoryWhereInput;
};

export type CategoryCreateInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  parentId?: InputMaybe<CategoryRelateToManyForCreateInput>;
  priority?: InputMaybe<Scalars['Int']>;
};

export type CategoryManyRelationFilter = {
  every?: InputMaybe<CategoryWhereInput>;
  none?: InputMaybe<CategoryWhereInput>;
  some?: InputMaybe<CategoryWhereInput>;
};

export type CategoryOrderByInput = {
  description?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  priority?: InputMaybe<OrderDirection>;
};

export type CategoryRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<CategoryWhereUniqueInput>>;
  create?: InputMaybe<Array<CategoryCreateInput>>;
};

export type CategoryRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<CategoryWhereUniqueInput>>;
  create?: InputMaybe<Array<CategoryCreateInput>>;
  disconnect?: InputMaybe<Array<CategoryWhereUniqueInput>>;
  set?: InputMaybe<Array<CategoryWhereUniqueInput>>;
};

export type CategoryUpdateArgs = {
  data: CategoryUpdateInput;
  where: CategoryWhereUniqueInput;
};

export type CategoryUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  parentId?: InputMaybe<CategoryRelateToManyForUpdateInput>;
  priority?: InputMaybe<Scalars['Int']>;
};

export type CategoryWhereInput = {
  AND?: InputMaybe<Array<CategoryWhereInput>>;
  NOT?: InputMaybe<Array<CategoryWhereInput>>;
  OR?: InputMaybe<Array<CategoryWhereInput>>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  parentId?: InputMaybe<CategoryManyRelationFilter>;
  priority?: InputMaybe<IntNullableFilter>;
};

export type CategoryWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Comment = {
  __typename?: 'Comment';
  comment?: Maybe<Scalars['String']>;
  course?: Maybe<Course>;
  courseItem?: Maybe<CourseItem>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  isValidated?: Maybe<Scalars['Boolean']>;
  rate?: Maybe<Scalars['Int']>;
  user?: Maybe<User>;
};

export type CommentCreateInput = {
  comment?: InputMaybe<Scalars['String']>;
  course?: InputMaybe<CourseRelateToOneForCreateInput>;
  courseItem?: InputMaybe<CourseItemRelateToOneForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  isValidated?: InputMaybe<Scalars['Boolean']>;
  rate?: InputMaybe<Scalars['Int']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type CommentManyRelationFilter = {
  every?: InputMaybe<CommentWhereInput>;
  none?: InputMaybe<CommentWhereInput>;
  some?: InputMaybe<CommentWhereInput>;
};

export type CommentOrderByInput = {
  comment?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isValidated?: InputMaybe<OrderDirection>;
  rate?: InputMaybe<OrderDirection>;
};

export type CommentRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<CommentWhereUniqueInput>>;
  create?: InputMaybe<Array<CommentCreateInput>>;
};

export type CommentRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<CommentWhereUniqueInput>>;
  create?: InputMaybe<Array<CommentCreateInput>>;
  disconnect?: InputMaybe<Array<CommentWhereUniqueInput>>;
  set?: InputMaybe<Array<CommentWhereUniqueInput>>;
};

export type CommentUpdateArgs = {
  data: CommentUpdateInput;
  where: CommentWhereUniqueInput;
};

export type CommentUpdateInput = {
  comment?: InputMaybe<Scalars['String']>;
  course?: InputMaybe<CourseRelateToOneForUpdateInput>;
  courseItem?: InputMaybe<CourseItemRelateToOneForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  isValidated?: InputMaybe<Scalars['Boolean']>;
  rate?: InputMaybe<Scalars['Int']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type CommentWhereInput = {
  AND?: InputMaybe<Array<CommentWhereInput>>;
  NOT?: InputMaybe<Array<CommentWhereInput>>;
  OR?: InputMaybe<Array<CommentWhereInput>>;
  comment?: InputMaybe<StringFilter>;
  course?: InputMaybe<CourseWhereInput>;
  courseItem?: InputMaybe<CourseItemWhereInput>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  isValidated?: InputMaybe<BooleanFilter>;
  rate?: InputMaybe<IntNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type CommentWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Coupon = {
  __typename?: 'Coupon';
  belongsTo?: Maybe<Array<Course>>;
  belongsToCount?: Maybe<Scalars['Int']>;
  code?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  discount?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  maxAmount?: Maybe<Scalars['Int']>;
  remaining?: Maybe<Scalars['Int']>;
};


export type CouponBelongsToArgs = {
  orderBy?: Array<CourseOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CourseWhereInput;
};


export type CouponBelongsToCountArgs = {
  where?: CourseWhereInput;
};

export type CouponCreateInput = {
  belongsTo?: InputMaybe<CourseRelateToManyForCreateInput>;
  code?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  discount?: InputMaybe<Scalars['Int']>;
  maxAmount?: InputMaybe<Scalars['Int']>;
};

export type CouponOrderByInput = {
  code?: InputMaybe<OrderDirection>;
  description?: InputMaybe<OrderDirection>;
  discount?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  maxAmount?: InputMaybe<OrderDirection>;
};

export type CouponRelateToOneForCreateInput = {
  connect?: InputMaybe<CouponWhereUniqueInput>;
  create?: InputMaybe<CouponCreateInput>;
};

export type CouponRelateToOneForUpdateInput = {
  connect?: InputMaybe<CouponWhereUniqueInput>;
  create?: InputMaybe<CouponCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export type CouponUpdateArgs = {
  data: CouponUpdateInput;
  where: CouponWhereUniqueInput;
};

export type CouponUpdateInput = {
  belongsTo?: InputMaybe<CourseRelateToManyForUpdateInput>;
  code?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  discount?: InputMaybe<Scalars['Int']>;
  maxAmount?: InputMaybe<Scalars['Int']>;
};

export type CouponWhereInput = {
  AND?: InputMaybe<Array<CouponWhereInput>>;
  NOT?: InputMaybe<Array<CouponWhereInput>>;
  OR?: InputMaybe<Array<CouponWhereInput>>;
  belongsTo?: InputMaybe<CourseManyRelationFilter>;
  code?: InputMaybe<IntFilter>;
  description?: InputMaybe<StringFilter>;
  discount?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<IdFilter>;
  maxAmount?: InputMaybe<IntFilter>;
};

export type CouponWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Course = {
  __typename?: 'Course';
  comments?: Maybe<Array<Comment>>;
  commentsCount?: Maybe<Scalars['Int']>;
  courseItem?: Maybe<Array<CourseItem>>;
  courseItemCount?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<ImageFieldOutput>;
  isAccessible?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  priceFa?: Maybe<Scalars['String']>;
  rate?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['String']>;
  teacher?: Maybe<Teacher>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars['Int']>;
};


export type CourseCommentsArgs = {
  orderBy?: Array<CommentOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CommentWhereInput;
};


export type CourseCommentsCountArgs = {
  where?: CommentWhereInput;
};


export type CourseCourseItemArgs = {
  orderBy?: Array<CourseItemOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CourseItemWhereInput;
};


export type CourseCourseItemCountArgs = {
  where?: CourseItemWhereInput;
};


export type CourseUsersArgs = {
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: UserWhereInput;
};


export type CourseUsersCountArgs = {
  where?: UserWhereInput;
};

export type CourseCreateInput = {
  comments?: InputMaybe<CommentRelateToManyForCreateInput>;
  courseItem?: InputMaybe<CourseItemRelateToManyForCreateInput>;
  description?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<ImageFieldInput>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  teacher?: InputMaybe<TeacherRelateToOneForCreateInput>;
  users?: InputMaybe<UserRelateToManyForCreateInput>;
};

export type CourseItem = {
  __typename?: 'CourseItem';
  comments?: Maybe<Array<Comment>>;
  commentsCount?: Maybe<Scalars['Int']>;
  course?: Maybe<Course>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  no?: Maybe<Scalars['Int']>;
  video?: Maybe<File>;
};


export type CourseItemCommentsArgs = {
  orderBy?: Array<CommentOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CommentWhereInput;
};


export type CourseItemCommentsCountArgs = {
  where?: CommentWhereInput;
};

export type CourseItemCreateInput = {
  comments?: InputMaybe<CommentRelateToManyForCreateInput>;
  course?: InputMaybe<CourseRelateToOneForCreateInput>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  no?: InputMaybe<Scalars['Int']>;
  video?: InputMaybe<FileRelateToOneForCreateInput>;
};

export type CourseItemManyRelationFilter = {
  every?: InputMaybe<CourseItemWhereInput>;
  none?: InputMaybe<CourseItemWhereInput>;
  some?: InputMaybe<CourseItemWhereInput>;
};

export type CourseItemOrderByInput = {
  description?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  no?: InputMaybe<OrderDirection>;
};

export type CourseItemRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<CourseItemWhereUniqueInput>>;
  create?: InputMaybe<Array<CourseItemCreateInput>>;
};

export type CourseItemRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<CourseItemWhereUniqueInput>>;
  create?: InputMaybe<Array<CourseItemCreateInput>>;
  disconnect?: InputMaybe<Array<CourseItemWhereUniqueInput>>;
  set?: InputMaybe<Array<CourseItemWhereUniqueInput>>;
};

export type CourseItemRelateToOneForCreateInput = {
  connect?: InputMaybe<CourseItemWhereUniqueInput>;
  create?: InputMaybe<CourseItemCreateInput>;
};

export type CourseItemRelateToOneForUpdateInput = {
  connect?: InputMaybe<CourseItemWhereUniqueInput>;
  create?: InputMaybe<CourseItemCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export type CourseItemUpdateArgs = {
  data: CourseItemUpdateInput;
  where: CourseItemWhereUniqueInput;
};

export type CourseItemUpdateInput = {
  comments?: InputMaybe<CommentRelateToManyForUpdateInput>;
  course?: InputMaybe<CourseRelateToOneForUpdateInput>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  no?: InputMaybe<Scalars['Int']>;
  video?: InputMaybe<FileRelateToOneForUpdateInput>;
};

export type CourseItemWhereInput = {
  AND?: InputMaybe<Array<CourseItemWhereInput>>;
  NOT?: InputMaybe<Array<CourseItemWhereInput>>;
  OR?: InputMaybe<Array<CourseItemWhereInput>>;
  comments?: InputMaybe<CommentManyRelationFilter>;
  course?: InputMaybe<CourseWhereInput>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  no?: InputMaybe<IntNullableFilter>;
  video?: InputMaybe<FileWhereInput>;
};

export type CourseItemWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type CourseManyRelationFilter = {
  every?: InputMaybe<CourseWhereInput>;
  none?: InputMaybe<CourseWhereInput>;
  some?: InputMaybe<CourseWhereInput>;
};

export type CourseOrderByInput = {
  description?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  price?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
};

export type CourseRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<CourseWhereUniqueInput>>;
  create?: InputMaybe<Array<CourseCreateInput>>;
};

export type CourseRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<CourseWhereUniqueInput>>;
  create?: InputMaybe<Array<CourseCreateInput>>;
  disconnect?: InputMaybe<Array<CourseWhereUniqueInput>>;
  set?: InputMaybe<Array<CourseWhereUniqueInput>>;
};

export type CourseRelateToOneForCreateInput = {
  connect?: InputMaybe<CourseWhereUniqueInput>;
  create?: InputMaybe<CourseCreateInput>;
};

export type CourseRelateToOneForUpdateInput = {
  connect?: InputMaybe<CourseWhereUniqueInput>;
  create?: InputMaybe<CourseCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export type CourseUpdateArgs = {
  data: CourseUpdateInput;
  where: CourseWhereUniqueInput;
};

export type CourseUpdateInput = {
  comments?: InputMaybe<CommentRelateToManyForUpdateInput>;
  courseItem?: InputMaybe<CourseItemRelateToManyForUpdateInput>;
  description?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<ImageFieldInput>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  teacher?: InputMaybe<TeacherRelateToOneForUpdateInput>;
  users?: InputMaybe<UserRelateToManyForUpdateInput>;
};

export type CourseWhereInput = {
  AND?: InputMaybe<Array<CourseWhereInput>>;
  NOT?: InputMaybe<Array<CourseWhereInput>>;
  OR?: InputMaybe<Array<CourseWhereInput>>;
  comments?: InputMaybe<CommentManyRelationFilter>;
  courseItem?: InputMaybe<CourseItemManyRelationFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  price?: InputMaybe<IntNullableFilter>;
  status?: InputMaybe<StringNullableFilter>;
  teacher?: InputMaybe<TeacherWhereInput>;
  users?: InputMaybe<UserManyRelationFilter>;
};

export type CourseWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type CreateInitialUserInput = {
  email?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<DateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type Event = {
  __typename?: 'Event';
  content?: Maybe<Event_Content_Document>;
  description?: Maybe<Scalars['String']>;
  from?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<ImageFieldOutput>;
  isAccessible?: Maybe<Scalars['Boolean']>;
  isOpen?: Maybe<Scalars['Boolean']>;
  isUpcomming?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Scalars['String']>;
  maxAmount?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  priceFa?: Maybe<Scalars['String']>;
  registrationDeadline?: Maybe<Scalars['String']>;
  remaining?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars['Int']>;
};


export type EventUsersArgs = {
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: UserWhereInput;
};


export type EventUsersCountArgs = {
  where?: UserWhereInput;
};

export type EventCreateInput = {
  content?: InputMaybe<Scalars['JSON']>;
  description?: InputMaybe<Scalars['String']>;
  from?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<ImageFieldInput>;
  location?: InputMaybe<Scalars['String']>;
  maxAmount?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Int']>;
  registrationDeadline?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<UserRelateToManyForCreateInput>;
};

export type EventManyRelationFilter = {
  every?: InputMaybe<EventWhereInput>;
  none?: InputMaybe<EventWhereInput>;
  some?: InputMaybe<EventWhereInput>;
};

export type EventOrderByInput = {
  description?: InputMaybe<OrderDirection>;
  from?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  location?: InputMaybe<OrderDirection>;
  maxAmount?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  price?: InputMaybe<OrderDirection>;
  registrationDeadline?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
  to?: InputMaybe<OrderDirection>;
};

export type EventRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<EventWhereUniqueInput>>;
  create?: InputMaybe<Array<EventCreateInput>>;
};

export type EventRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<EventWhereUniqueInput>>;
  create?: InputMaybe<Array<EventCreateInput>>;
  disconnect?: InputMaybe<Array<EventWhereUniqueInput>>;
  set?: InputMaybe<Array<EventWhereUniqueInput>>;
};

export type EventRelateToOneForCreateInput = {
  connect?: InputMaybe<EventWhereUniqueInput>;
  create?: InputMaybe<EventCreateInput>;
};

export type EventRelateToOneForUpdateInput = {
  connect?: InputMaybe<EventWhereUniqueInput>;
  create?: InputMaybe<EventCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export type EventUpdateArgs = {
  data: EventUpdateInput;
  where: EventWhereUniqueInput;
};

export type EventUpdateInput = {
  content?: InputMaybe<Scalars['JSON']>;
  description?: InputMaybe<Scalars['String']>;
  from?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<ImageFieldInput>;
  location?: InputMaybe<Scalars['String']>;
  maxAmount?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Int']>;
  registrationDeadline?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<UserRelateToManyForUpdateInput>;
};

export type EventWhereInput = {
  AND?: InputMaybe<Array<EventWhereInput>>;
  NOT?: InputMaybe<Array<EventWhereInput>>;
  OR?: InputMaybe<Array<EventWhereInput>>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  location?: InputMaybe<StringFilter>;
  maxAmount?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  price?: InputMaybe<IntNullableFilter>;
  status?: InputMaybe<StringNullableFilter>;
  users?: InputMaybe<UserManyRelationFilter>;
};

export type EventWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Event_Content_Document = {
  __typename?: 'Event_content_Document';
  document: Scalars['JSON'];
};


export type Event_Content_DocumentDocumentArgs = {
  hydrateRelationships?: Scalars['Boolean'];
};

export type File = {
  __typename?: 'File';
  altText?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  type?: Maybe<Scalars['String']>;
  video?: Maybe<FileFieldOutput>;
};

export type FileCreateInput = {
  altText?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  type?: InputMaybe<Scalars['String']>;
  video?: InputMaybe<FileFieldInput>;
};

export type FileFieldInput = {
  upload: Scalars['Upload'];
};

export type FileFieldOutput = {
  __typename?: 'FileFieldOutput';
  filename: Scalars['String'];
  filesize: Scalars['Int'];
  url: Scalars['String'];
};

export type FileOrderByInput = {
  altText?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  type?: InputMaybe<OrderDirection>;
};

export type FileRelateToOneForCreateInput = {
  connect?: InputMaybe<FileWhereUniqueInput>;
  create?: InputMaybe<FileCreateInput>;
};

export type FileRelateToOneForUpdateInput = {
  connect?: InputMaybe<FileWhereUniqueInput>;
  create?: InputMaybe<FileCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export type FileUpdateArgs = {
  data: FileUpdateInput;
  where: FileWhereUniqueInput;
};

export type FileUpdateInput = {
  altText?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  type?: InputMaybe<Scalars['String']>;
  video?: InputMaybe<FileFieldInput>;
};

export type FileWhereInput = {
  AND?: InputMaybe<Array<FileWhereInput>>;
  NOT?: InputMaybe<Array<FileWhereInput>>;
  OR?: InputMaybe<Array<FileWhereInput>>;
  altText?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  type?: InputMaybe<StringNullableFilter>;
};

export type FileWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type FloatNullableFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<FloatNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type IdFilter = {
  equals?: InputMaybe<Scalars['ID']>;
  gt?: InputMaybe<Scalars['ID']>;
  gte?: InputMaybe<Scalars['ID']>;
  in?: InputMaybe<Array<Scalars['ID']>>;
  lt?: InputMaybe<Scalars['ID']>;
  lte?: InputMaybe<Scalars['ID']>;
  not?: InputMaybe<IdFilter>;
  notIn?: InputMaybe<Array<Scalars['ID']>>;
};

export enum ImageExtension {
  Gif = 'gif',
  Jpg = 'jpg',
  Png = 'png',
  Webp = 'webp'
}

export type ImageFieldInput = {
  upload: Scalars['Upload'];
};

export type ImageFieldOutput = {
  __typename?: 'ImageFieldOutput';
  extension: ImageExtension;
  filesize: Scalars['Int'];
  height: Scalars['Int'];
  id: Scalars['ID'];
  url: Scalars['String'];
  width: Scalars['Int'];
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<IntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<IntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type KeystoneAdminMeta = {
  __typename?: 'KeystoneAdminMeta';
  list?: Maybe<KeystoneAdminUiListMeta>;
  lists: Array<KeystoneAdminUiListMeta>;
};


export type KeystoneAdminMetaListArgs = {
  key: Scalars['String'];
};

export type KeystoneAdminUiFieldGroupMeta = {
  __typename?: 'KeystoneAdminUIFieldGroupMeta';
  description?: Maybe<Scalars['String']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  label: Scalars['String'];
};

export type KeystoneAdminUiFieldMeta = {
  __typename?: 'KeystoneAdminUIFieldMeta';
  createView: KeystoneAdminUiFieldMetaCreateView;
  customViewsIndex?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  fieldMeta?: Maybe<Scalars['JSON']>;
  isFilterable: Scalars['Boolean'];
  isOrderable: Scalars['Boolean'];
  itemView?: Maybe<KeystoneAdminUiFieldMetaItemView>;
  label: Scalars['String'];
  listView: KeystoneAdminUiFieldMetaListView;
  path: Scalars['String'];
  search?: Maybe<QueryMode>;
  viewsIndex: Scalars['Int'];
};


export type KeystoneAdminUiFieldMetaItemViewArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type KeystoneAdminUiFieldMetaCreateView = {
  __typename?: 'KeystoneAdminUIFieldMetaCreateView';
  fieldMode: KeystoneAdminUiFieldMetaCreateViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaCreateViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden'
}

export type KeystoneAdminUiFieldMetaItemView = {
  __typename?: 'KeystoneAdminUIFieldMetaItemView';
  fieldMode?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldMode>;
  fieldPosition?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldPosition>;
};

export enum KeystoneAdminUiFieldMetaItemViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden',
  Read = 'read'
}

export enum KeystoneAdminUiFieldMetaItemViewFieldPosition {
  Form = 'form',
  Sidebar = 'sidebar'
}

export type KeystoneAdminUiFieldMetaListView = {
  __typename?: 'KeystoneAdminUIFieldMetaListView';
  fieldMode: KeystoneAdminUiFieldMetaListViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaListViewFieldMode {
  Hidden = 'hidden',
  Read = 'read'
}

export type KeystoneAdminUiListMeta = {
  __typename?: 'KeystoneAdminUIListMeta';
  description?: Maybe<Scalars['String']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  groups: Array<KeystoneAdminUiFieldGroupMeta>;
  hideCreate: Scalars['Boolean'];
  hideDelete: Scalars['Boolean'];
  initialColumns: Array<Scalars['String']>;
  initialSort?: Maybe<KeystoneAdminUiSort>;
  isHidden: Scalars['Boolean'];
  isSingleton: Scalars['Boolean'];
  itemQueryName: Scalars['String'];
  key: Scalars['String'];
  label: Scalars['String'];
  labelField: Scalars['String'];
  listQueryName: Scalars['String'];
  pageSize: Scalars['Int'];
  path: Scalars['String'];
  plural: Scalars['String'];
  singular: Scalars['String'];
};

export type KeystoneAdminUiSort = {
  __typename?: 'KeystoneAdminUISort';
  direction: KeystoneAdminUiSortDirection;
  field: Scalars['String'];
};

export enum KeystoneAdminUiSortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type KeystoneMeta = {
  __typename?: 'KeystoneMeta';
  adminMeta: KeystoneAdminMeta;
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticateUserWithPassword?: Maybe<UserAuthenticationWithPasswordResult>;
  createCart?: Maybe<Cart>;
  createCartItem?: Maybe<CartItem>;
  createCartItems?: Maybe<Array<Maybe<CartItem>>>;
  createCarts?: Maybe<Array<Maybe<Cart>>>;
  createCategories?: Maybe<Array<Maybe<Category>>>;
  createCategory?: Maybe<Category>;
  createComment?: Maybe<Comment>;
  createComments?: Maybe<Array<Maybe<Comment>>>;
  createCoupon?: Maybe<Coupon>;
  createCoupons?: Maybe<Array<Maybe<Coupon>>>;
  createCourse?: Maybe<Course>;
  createCourseItem?: Maybe<CourseItem>;
  createCourseItems?: Maybe<Array<Maybe<CourseItem>>>;
  createCourses?: Maybe<Array<Maybe<Course>>>;
  createEvent?: Maybe<Event>;
  createEvents?: Maybe<Array<Maybe<Event>>>;
  createFile?: Maybe<File>;
  createFiles?: Maybe<Array<Maybe<File>>>;
  createInitialUser: UserAuthenticationWithPasswordSuccess;
  createManySettings?: Maybe<Array<Maybe<Settings>>>;
  createOrder?: Maybe<Order>;
  createOrderItem?: Maybe<OrderItem>;
  createOrderItems?: Maybe<Array<Maybe<OrderItem>>>;
  createOrders?: Maybe<Array<Maybe<Order>>>;
  createPost?: Maybe<Post>;
  createPosts?: Maybe<Array<Maybe<Post>>>;
  createSettings?: Maybe<Settings>;
  createTag?: Maybe<Tag>;
  createTags?: Maybe<Array<Maybe<Tag>>>;
  createTeacher?: Maybe<Teacher>;
  createTeachers?: Maybe<Array<Maybe<Teacher>>>;
  createUser?: Maybe<User>;
  createUsers?: Maybe<Array<Maybe<User>>>;
  deleteCart?: Maybe<Cart>;
  deleteCartItem?: Maybe<CartItem>;
  deleteCartItems?: Maybe<Array<Maybe<CartItem>>>;
  deleteCarts?: Maybe<Array<Maybe<Cart>>>;
  deleteCategories?: Maybe<Array<Maybe<Category>>>;
  deleteCategory?: Maybe<Category>;
  deleteComment?: Maybe<Comment>;
  deleteComments?: Maybe<Array<Maybe<Comment>>>;
  deleteCoupon?: Maybe<Coupon>;
  deleteCoupons?: Maybe<Array<Maybe<Coupon>>>;
  deleteCourse?: Maybe<Course>;
  deleteCourseItem?: Maybe<CourseItem>;
  deleteCourseItems?: Maybe<Array<Maybe<CourseItem>>>;
  deleteCourses?: Maybe<Array<Maybe<Course>>>;
  deleteEvent?: Maybe<Event>;
  deleteEvents?: Maybe<Array<Maybe<Event>>>;
  deleteFile?: Maybe<File>;
  deleteFiles?: Maybe<Array<Maybe<File>>>;
  deleteManySettings?: Maybe<Array<Maybe<Settings>>>;
  deleteOrder?: Maybe<Order>;
  deleteOrderItem?: Maybe<OrderItem>;
  deleteOrderItems?: Maybe<Array<Maybe<OrderItem>>>;
  deleteOrders?: Maybe<Array<Maybe<Order>>>;
  deletePost?: Maybe<Post>;
  deletePosts?: Maybe<Array<Maybe<Post>>>;
  deleteSettings?: Maybe<Settings>;
  deleteTag?: Maybe<Tag>;
  deleteTags?: Maybe<Array<Maybe<Tag>>>;
  deleteTeacher?: Maybe<Teacher>;
  deleteTeachers?: Maybe<Array<Maybe<Teacher>>>;
  deleteUser?: Maybe<User>;
  deleteUsers?: Maybe<Array<Maybe<User>>>;
  endSession: Scalars['Boolean'];
  redeemUserPasswordResetToken?: Maybe<RedeemUserPasswordResetTokenResult>;
  sendUserPasswordResetLink: Scalars['Boolean'];
  updateCart?: Maybe<Cart>;
  updateCartItem?: Maybe<CartItem>;
  updateCartItems?: Maybe<Array<Maybe<CartItem>>>;
  updateCarts?: Maybe<Array<Maybe<Cart>>>;
  updateCategories?: Maybe<Array<Maybe<Category>>>;
  updateCategory?: Maybe<Category>;
  updateComment?: Maybe<Comment>;
  updateComments?: Maybe<Array<Maybe<Comment>>>;
  updateCoupon?: Maybe<Coupon>;
  updateCoupons?: Maybe<Array<Maybe<Coupon>>>;
  updateCourse?: Maybe<Course>;
  updateCourseItem?: Maybe<CourseItem>;
  updateCourseItems?: Maybe<Array<Maybe<CourseItem>>>;
  updateCourses?: Maybe<Array<Maybe<Course>>>;
  updateEvent?: Maybe<Event>;
  updateEvents?: Maybe<Array<Maybe<Event>>>;
  updateFile?: Maybe<File>;
  updateFiles?: Maybe<Array<Maybe<File>>>;
  updateManySettings?: Maybe<Array<Maybe<Settings>>>;
  updateOrder?: Maybe<Order>;
  updateOrderItem?: Maybe<OrderItem>;
  updateOrderItems?: Maybe<Array<Maybe<OrderItem>>>;
  updateOrders?: Maybe<Array<Maybe<Order>>>;
  updatePost?: Maybe<Post>;
  updatePosts?: Maybe<Array<Maybe<Post>>>;
  updateSettings?: Maybe<Settings>;
  updateTag?: Maybe<Tag>;
  updateTags?: Maybe<Array<Maybe<Tag>>>;
  updateTeacher?: Maybe<Teacher>;
  updateTeachers?: Maybe<Array<Maybe<Teacher>>>;
  updateUser?: Maybe<User>;
  updateUsers?: Maybe<Array<Maybe<User>>>;
};


export type MutationAuthenticateUserWithPasswordArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateCartArgs = {
  data: CartCreateInput;
};


export type MutationCreateCartItemArgs = {
  data: CartItemCreateInput;
};


export type MutationCreateCartItemsArgs = {
  data: Array<CartItemCreateInput>;
};


export type MutationCreateCartsArgs = {
  data: Array<CartCreateInput>;
};


export type MutationCreateCategoriesArgs = {
  data: Array<CategoryCreateInput>;
};


export type MutationCreateCategoryArgs = {
  data: CategoryCreateInput;
};


export type MutationCreateCommentArgs = {
  data: CommentCreateInput;
};


export type MutationCreateCommentsArgs = {
  data: Array<CommentCreateInput>;
};


export type MutationCreateCouponArgs = {
  data: CouponCreateInput;
};


export type MutationCreateCouponsArgs = {
  data: Array<CouponCreateInput>;
};


export type MutationCreateCourseArgs = {
  data: CourseCreateInput;
};


export type MutationCreateCourseItemArgs = {
  data: CourseItemCreateInput;
};


export type MutationCreateCourseItemsArgs = {
  data: Array<CourseItemCreateInput>;
};


export type MutationCreateCoursesArgs = {
  data: Array<CourseCreateInput>;
};


export type MutationCreateEventArgs = {
  data: EventCreateInput;
};


export type MutationCreateEventsArgs = {
  data: Array<EventCreateInput>;
};


export type MutationCreateFileArgs = {
  data: FileCreateInput;
};


export type MutationCreateFilesArgs = {
  data: Array<FileCreateInput>;
};


export type MutationCreateInitialUserArgs = {
  data: CreateInitialUserInput;
};


export type MutationCreateManySettingsArgs = {
  data: Array<SettingsCreateInput>;
};


export type MutationCreateOrderArgs = {
  data: OrderCreateInput;
};


export type MutationCreateOrderItemArgs = {
  data: OrderItemCreateInput;
};


export type MutationCreateOrderItemsArgs = {
  data: Array<OrderItemCreateInput>;
};


export type MutationCreateOrdersArgs = {
  data: Array<OrderCreateInput>;
};


export type MutationCreatePostArgs = {
  data: PostCreateInput;
};


export type MutationCreatePostsArgs = {
  data: Array<PostCreateInput>;
};


export type MutationCreateSettingsArgs = {
  data: SettingsCreateInput;
};


export type MutationCreateTagArgs = {
  data: TagCreateInput;
};


export type MutationCreateTagsArgs = {
  data: Array<TagCreateInput>;
};


export type MutationCreateTeacherArgs = {
  data: TeacherCreateInput;
};


export type MutationCreateTeachersArgs = {
  data: Array<TeacherCreateInput>;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationCreateUsersArgs = {
  data: Array<UserCreateInput>;
};


export type MutationDeleteCartArgs = {
  where: CartWhereUniqueInput;
};


export type MutationDeleteCartItemArgs = {
  where: CartItemWhereUniqueInput;
};


export type MutationDeleteCartItemsArgs = {
  where: Array<CartItemWhereUniqueInput>;
};


export type MutationDeleteCartsArgs = {
  where: Array<CartWhereUniqueInput>;
};


export type MutationDeleteCategoriesArgs = {
  where: Array<CategoryWhereUniqueInput>;
};


export type MutationDeleteCategoryArgs = {
  where: CategoryWhereUniqueInput;
};


export type MutationDeleteCommentArgs = {
  where: CommentWhereUniqueInput;
};


export type MutationDeleteCommentsArgs = {
  where: Array<CommentWhereUniqueInput>;
};


export type MutationDeleteCouponArgs = {
  where: CouponWhereUniqueInput;
};


export type MutationDeleteCouponsArgs = {
  where: Array<CouponWhereUniqueInput>;
};


export type MutationDeleteCourseArgs = {
  where: CourseWhereUniqueInput;
};


export type MutationDeleteCourseItemArgs = {
  where: CourseItemWhereUniqueInput;
};


export type MutationDeleteCourseItemsArgs = {
  where: Array<CourseItemWhereUniqueInput>;
};


export type MutationDeleteCoursesArgs = {
  where: Array<CourseWhereUniqueInput>;
};


export type MutationDeleteEventArgs = {
  where: EventWhereUniqueInput;
};


export type MutationDeleteEventsArgs = {
  where: Array<EventWhereUniqueInput>;
};


export type MutationDeleteFileArgs = {
  where: FileWhereUniqueInput;
};


export type MutationDeleteFilesArgs = {
  where: Array<FileWhereUniqueInput>;
};


export type MutationDeleteManySettingsArgs = {
  where: Array<SettingsWhereUniqueInput>;
};


export type MutationDeleteOrderArgs = {
  where: OrderWhereUniqueInput;
};


export type MutationDeleteOrderItemArgs = {
  where: OrderItemWhereUniqueInput;
};


export type MutationDeleteOrderItemsArgs = {
  where: Array<OrderItemWhereUniqueInput>;
};


export type MutationDeleteOrdersArgs = {
  where: Array<OrderWhereUniqueInput>;
};


export type MutationDeletePostArgs = {
  where: PostWhereUniqueInput;
};


export type MutationDeletePostsArgs = {
  where: Array<PostWhereUniqueInput>;
};


export type MutationDeleteSettingsArgs = {
  where?: SettingsWhereUniqueInput;
};


export type MutationDeleteTagArgs = {
  where: TagWhereUniqueInput;
};


export type MutationDeleteTagsArgs = {
  where: Array<TagWhereUniqueInput>;
};


export type MutationDeleteTeacherArgs = {
  where: TeacherWhereUniqueInput;
};


export type MutationDeleteTeachersArgs = {
  where: Array<TeacherWhereUniqueInput>;
};


export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationDeleteUsersArgs = {
  where: Array<UserWhereUniqueInput>;
};


export type MutationRedeemUserPasswordResetTokenArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationSendUserPasswordResetLinkArgs = {
  email: Scalars['String'];
};


export type MutationUpdateCartArgs = {
  data: CartUpdateInput;
  where: CartWhereUniqueInput;
};


export type MutationUpdateCartItemArgs = {
  data: CartItemUpdateInput;
  where: CartItemWhereUniqueInput;
};


export type MutationUpdateCartItemsArgs = {
  data: Array<CartItemUpdateArgs>;
};


export type MutationUpdateCartsArgs = {
  data: Array<CartUpdateArgs>;
};


export type MutationUpdateCategoriesArgs = {
  data: Array<CategoryUpdateArgs>;
};


export type MutationUpdateCategoryArgs = {
  data: CategoryUpdateInput;
  where: CategoryWhereUniqueInput;
};


export type MutationUpdateCommentArgs = {
  data: CommentUpdateInput;
  where: CommentWhereUniqueInput;
};


export type MutationUpdateCommentsArgs = {
  data: Array<CommentUpdateArgs>;
};


export type MutationUpdateCouponArgs = {
  data: CouponUpdateInput;
  where: CouponWhereUniqueInput;
};


export type MutationUpdateCouponsArgs = {
  data: Array<CouponUpdateArgs>;
};


export type MutationUpdateCourseArgs = {
  data: CourseUpdateInput;
  where: CourseWhereUniqueInput;
};


export type MutationUpdateCourseItemArgs = {
  data: CourseItemUpdateInput;
  where: CourseItemWhereUniqueInput;
};


export type MutationUpdateCourseItemsArgs = {
  data: Array<CourseItemUpdateArgs>;
};


export type MutationUpdateCoursesArgs = {
  data: Array<CourseUpdateArgs>;
};


export type MutationUpdateEventArgs = {
  data: EventUpdateInput;
  where: EventWhereUniqueInput;
};


export type MutationUpdateEventsArgs = {
  data: Array<EventUpdateArgs>;
};


export type MutationUpdateFileArgs = {
  data: FileUpdateInput;
  where: FileWhereUniqueInput;
};


export type MutationUpdateFilesArgs = {
  data: Array<FileUpdateArgs>;
};


export type MutationUpdateManySettingsArgs = {
  data: Array<SettingsUpdateArgs>;
};


export type MutationUpdateOrderArgs = {
  data: OrderUpdateInput;
  where: OrderWhereUniqueInput;
};


export type MutationUpdateOrderItemArgs = {
  data: OrderItemUpdateInput;
  where: OrderItemWhereUniqueInput;
};


export type MutationUpdateOrderItemsArgs = {
  data: Array<OrderItemUpdateArgs>;
};


export type MutationUpdateOrdersArgs = {
  data: Array<OrderUpdateArgs>;
};


export type MutationUpdatePostArgs = {
  data: PostUpdateInput;
  where: PostWhereUniqueInput;
};


export type MutationUpdatePostsArgs = {
  data: Array<PostUpdateArgs>;
};


export type MutationUpdateSettingsArgs = {
  data: SettingsUpdateInput;
  where?: SettingsWhereUniqueInput;
};


export type MutationUpdateTagArgs = {
  data: TagUpdateInput;
  where: TagWhereUniqueInput;
};


export type MutationUpdateTagsArgs = {
  data: Array<TagUpdateArgs>;
};


export type MutationUpdateTeacherArgs = {
  data: TeacherUpdateInput;
  where: TeacherWhereUniqueInput;
};


export type MutationUpdateTeachersArgs = {
  data: Array<TeacherUpdateArgs>;
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpdateUsersArgs = {
  data: Array<UserUpdateArgs>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['ID'];
  items?: Maybe<Array<OrderItem>>;
  itemsCount?: Maybe<Scalars['Int']>;
  orderDate?: Maybe<Scalars['DateTime']>;
  paymentStatus?: Maybe<Scalars['Int']>;
  totalCost?: Maybe<Scalars['Float']>;
  trackId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};


export type OrderItemsArgs = {
  orderBy?: Array<OrderItemOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: OrderItemWhereInput;
};


export type OrderItemsCountArgs = {
  where?: OrderItemWhereInput;
};

export type OrderCreateInput = {
  items?: InputMaybe<OrderItemRelateToManyForCreateInput>;
  orderDate?: InputMaybe<Scalars['DateTime']>;
  paymentStatus?: InputMaybe<Scalars['Int']>;
  totalCost?: InputMaybe<Scalars['Float']>;
  trackId?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type OrderItem = {
  __typename?: 'OrderItem';
  course?: Maybe<Course>;
  description?: Maybe<Scalars['String']>;
  event?: Maybe<Event>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  order?: Maybe<Order>;
  price?: Maybe<Scalars['Int']>;
  quantity?: Maybe<Scalars['Int']>;
};

export type OrderItemCreateInput = {
  course?: InputMaybe<CourseRelateToOneForCreateInput>;
  description?: InputMaybe<Scalars['String']>;
  event?: InputMaybe<EventRelateToOneForCreateInput>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<OrderRelateToOneForCreateInput>;
  price?: InputMaybe<Scalars['Int']>;
  quantity?: InputMaybe<Scalars['Int']>;
};

export type OrderItemManyRelationFilter = {
  every?: InputMaybe<OrderItemWhereInput>;
  none?: InputMaybe<OrderItemWhereInput>;
  some?: InputMaybe<OrderItemWhereInput>;
};

export type OrderItemOrderByInput = {
  description?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  price?: InputMaybe<OrderDirection>;
  quantity?: InputMaybe<OrderDirection>;
};

export type OrderItemRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<OrderItemWhereUniqueInput>>;
  create?: InputMaybe<Array<OrderItemCreateInput>>;
};

export type OrderItemRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<OrderItemWhereUniqueInput>>;
  create?: InputMaybe<Array<OrderItemCreateInput>>;
  disconnect?: InputMaybe<Array<OrderItemWhereUniqueInput>>;
  set?: InputMaybe<Array<OrderItemWhereUniqueInput>>;
};

export type OrderItemUpdateArgs = {
  data: OrderItemUpdateInput;
  where: OrderItemWhereUniqueInput;
};

export type OrderItemUpdateInput = {
  course?: InputMaybe<CourseRelateToOneForUpdateInput>;
  description?: InputMaybe<Scalars['String']>;
  event?: InputMaybe<EventRelateToOneForUpdateInput>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<OrderRelateToOneForUpdateInput>;
  price?: InputMaybe<Scalars['Int']>;
  quantity?: InputMaybe<Scalars['Int']>;
};

export type OrderItemWhereInput = {
  AND?: InputMaybe<Array<OrderItemWhereInput>>;
  NOT?: InputMaybe<Array<OrderItemWhereInput>>;
  OR?: InputMaybe<Array<OrderItemWhereInput>>;
  course?: InputMaybe<CourseWhereInput>;
  description?: InputMaybe<StringFilter>;
  event?: InputMaybe<EventWhereInput>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  order?: InputMaybe<OrderWhereInput>;
  price?: InputMaybe<IntNullableFilter>;
  quantity?: InputMaybe<IntNullableFilter>;
};

export type OrderItemWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type OrderManyRelationFilter = {
  every?: InputMaybe<OrderWhereInput>;
  none?: InputMaybe<OrderWhereInput>;
  some?: InputMaybe<OrderWhereInput>;
};

export type OrderOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  orderDate?: InputMaybe<OrderDirection>;
  paymentStatus?: InputMaybe<OrderDirection>;
  totalCost?: InputMaybe<OrderDirection>;
  trackId?: InputMaybe<OrderDirection>;
};

export type OrderRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<OrderWhereUniqueInput>>;
  create?: InputMaybe<Array<OrderCreateInput>>;
};

export type OrderRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<OrderWhereUniqueInput>>;
  create?: InputMaybe<Array<OrderCreateInput>>;
  disconnect?: InputMaybe<Array<OrderWhereUniqueInput>>;
  set?: InputMaybe<Array<OrderWhereUniqueInput>>;
};

export type OrderRelateToOneForCreateInput = {
  connect?: InputMaybe<OrderWhereUniqueInput>;
  create?: InputMaybe<OrderCreateInput>;
};

export type OrderRelateToOneForUpdateInput = {
  connect?: InputMaybe<OrderWhereUniqueInput>;
  create?: InputMaybe<OrderCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export type OrderUpdateArgs = {
  data: OrderUpdateInput;
  where: OrderWhereUniqueInput;
};

export type OrderUpdateInput = {
  items?: InputMaybe<OrderItemRelateToManyForUpdateInput>;
  orderDate?: InputMaybe<Scalars['DateTime']>;
  paymentStatus?: InputMaybe<Scalars['Int']>;
  totalCost?: InputMaybe<Scalars['Float']>;
  trackId?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type OrderWhereInput = {
  AND?: InputMaybe<Array<OrderWhereInput>>;
  NOT?: InputMaybe<Array<OrderWhereInput>>;
  OR?: InputMaybe<Array<OrderWhereInput>>;
  id?: InputMaybe<IdFilter>;
  items?: InputMaybe<OrderItemManyRelationFilter>;
  orderDate?: InputMaybe<DateTimeNullableFilter>;
  paymentStatus?: InputMaybe<IntNullableFilter>;
  totalCost?: InputMaybe<FloatNullableFilter>;
  trackId?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type OrderWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type PasswordFilter = {
  isSet: Scalars['Boolean'];
};

export enum PasswordResetRedemptionErrorCode {
  Failure = 'FAILURE',
  TokenExpired = 'TOKEN_EXPIRED',
  TokenRedeemed = 'TOKEN_REDEEMED'
}

export type PasswordState = {
  __typename?: 'PasswordState';
  isSet: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  content?: Maybe<Post_Content_Document>;
  example?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  someFieldName?: Maybe<Scalars['CalendarDay']>;
  tags?: Maybe<Array<Tag>>;
  tagsCount?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};


export type PostTagsArgs = {
  orderBy?: Array<TagOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: TagWhereInput;
};


export type PostTagsCountArgs = {
  where?: TagWhereInput;
};

export type PostCreateInput = {
  author?: InputMaybe<UserRelateToOneForCreateInput>;
  content?: InputMaybe<Scalars['JSON']>;
  example?: InputMaybe<Scalars['String']>;
  someFieldName?: InputMaybe<Scalars['CalendarDay']>;
  tags?: InputMaybe<TagRelateToManyForCreateInput>;
  title?: InputMaybe<Scalars['String']>;
};

export type PostManyRelationFilter = {
  every?: InputMaybe<PostWhereInput>;
  none?: InputMaybe<PostWhereInput>;
  some?: InputMaybe<PostWhereInput>;
};

export type PostOrderByInput = {
  example?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  someFieldName?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type PostRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<PostWhereUniqueInput>>;
  create?: InputMaybe<Array<PostCreateInput>>;
};

export type PostRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<PostWhereUniqueInput>>;
  create?: InputMaybe<Array<PostCreateInput>>;
  disconnect?: InputMaybe<Array<PostWhereUniqueInput>>;
  set?: InputMaybe<Array<PostWhereUniqueInput>>;
};

export type PostUpdateArgs = {
  data: PostUpdateInput;
  where: PostWhereUniqueInput;
};

export type PostUpdateInput = {
  author?: InputMaybe<UserRelateToOneForUpdateInput>;
  content?: InputMaybe<Scalars['JSON']>;
  example?: InputMaybe<Scalars['String']>;
  someFieldName?: InputMaybe<Scalars['CalendarDay']>;
  tags?: InputMaybe<TagRelateToManyForUpdateInput>;
  title?: InputMaybe<Scalars['String']>;
};

export type PostWhereInput = {
  AND?: InputMaybe<Array<PostWhereInput>>;
  NOT?: InputMaybe<Array<PostWhereInput>>;
  OR?: InputMaybe<Array<PostWhereInput>>;
  author?: InputMaybe<UserWhereInput>;
  id?: InputMaybe<IdFilter>;
  someFieldName?: InputMaybe<CalendarDayFilter>;
  tags?: InputMaybe<TagManyRelationFilter>;
  title?: InputMaybe<StringFilter>;
};

export type PostWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
  someFieldName?: InputMaybe<Scalars['CalendarDay']>;
};

export type Post_Content_Document = {
  __typename?: 'Post_content_Document';
  document: Scalars['JSON'];
};


export type Post_Content_DocumentDocumentArgs = {
  hydrateRelationships?: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  authenticatedItem?: Maybe<AuthenticatedItem>;
  cart?: Maybe<Cart>;
  cartItem?: Maybe<CartItem>;
  cartItems?: Maybe<Array<CartItem>>;
  cartItemsCount?: Maybe<Scalars['Int']>;
  carts?: Maybe<Array<Cart>>;
  cartsCount?: Maybe<Scalars['Int']>;
  categories?: Maybe<Array<Category>>;
  categoriesCount?: Maybe<Scalars['Int']>;
  category?: Maybe<Category>;
  comment?: Maybe<Comment>;
  comments?: Maybe<Array<Comment>>;
  commentsCount?: Maybe<Scalars['Int']>;
  coupon?: Maybe<Coupon>;
  coupons?: Maybe<Array<Coupon>>;
  couponsCount?: Maybe<Scalars['Int']>;
  course?: Maybe<Course>;
  courseItem?: Maybe<CourseItem>;
  courseItems?: Maybe<Array<CourseItem>>;
  courseItemsCount?: Maybe<Scalars['Int']>;
  courses?: Maybe<Array<Course>>;
  coursesCount?: Maybe<Scalars['Int']>;
  event?: Maybe<Event>;
  events?: Maybe<Array<Event>>;
  eventsCount?: Maybe<Scalars['Int']>;
  file?: Maybe<File>;
  files?: Maybe<Array<File>>;
  filesCount?: Maybe<Scalars['Int']>;
  keystone: KeystoneMeta;
  manySettings?: Maybe<Array<Settings>>;
  manySettingsCount?: Maybe<Scalars['Int']>;
  order?: Maybe<Order>;
  orderItem?: Maybe<OrderItem>;
  orderItems?: Maybe<Array<OrderItem>>;
  orderItemsCount?: Maybe<Scalars['Int']>;
  orders?: Maybe<Array<Order>>;
  ordersCount?: Maybe<Scalars['Int']>;
  post?: Maybe<Post>;
  posts?: Maybe<Array<Post>>;
  postsCount?: Maybe<Scalars['Int']>;
  settings?: Maybe<Settings>;
  tag?: Maybe<Tag>;
  tags?: Maybe<Array<Tag>>;
  tagsCount?: Maybe<Scalars['Int']>;
  teacher?: Maybe<Teacher>;
  teachers?: Maybe<Array<Teacher>>;
  teachersCount?: Maybe<Scalars['Int']>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars['Int']>;
  validateUserPasswordResetToken?: Maybe<ValidateUserPasswordResetTokenResult>;
};


export type QueryCartArgs = {
  where: CartWhereUniqueInput;
};


export type QueryCartItemArgs = {
  where: CartItemWhereUniqueInput;
};


export type QueryCartItemsArgs = {
  orderBy?: Array<CartItemOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CartItemWhereInput;
};


export type QueryCartItemsCountArgs = {
  where?: CartItemWhereInput;
};


export type QueryCartsArgs = {
  orderBy?: Array<CartOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CartWhereInput;
};


export type QueryCartsCountArgs = {
  where?: CartWhereInput;
};


export type QueryCategoriesArgs = {
  orderBy?: Array<CategoryOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CategoryWhereInput;
};


export type QueryCategoriesCountArgs = {
  where?: CategoryWhereInput;
};


export type QueryCategoryArgs = {
  where: CategoryWhereUniqueInput;
};


export type QueryCommentArgs = {
  where: CommentWhereUniqueInput;
};


export type QueryCommentsArgs = {
  orderBy?: Array<CommentOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CommentWhereInput;
};


export type QueryCommentsCountArgs = {
  where?: CommentWhereInput;
};


export type QueryCouponArgs = {
  where: CouponWhereUniqueInput;
};


export type QueryCouponsArgs = {
  orderBy?: Array<CouponOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CouponWhereInput;
};


export type QueryCouponsCountArgs = {
  where?: CouponWhereInput;
};


export type QueryCourseArgs = {
  where: CourseWhereUniqueInput;
};


export type QueryCourseItemArgs = {
  where: CourseItemWhereUniqueInput;
};


export type QueryCourseItemsArgs = {
  orderBy?: Array<CourseItemOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CourseItemWhereInput;
};


export type QueryCourseItemsCountArgs = {
  where?: CourseItemWhereInput;
};


export type QueryCoursesArgs = {
  orderBy?: Array<CourseOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CourseWhereInput;
};


export type QueryCoursesCountArgs = {
  where?: CourseWhereInput;
};


export type QueryEventArgs = {
  where: EventWhereUniqueInput;
};


export type QueryEventsArgs = {
  orderBy?: Array<EventOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: EventWhereInput;
};


export type QueryEventsCountArgs = {
  where?: EventWhereInput;
};


export type QueryFileArgs = {
  where: FileWhereUniqueInput;
};


export type QueryFilesArgs = {
  orderBy?: Array<FileOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: FileWhereInput;
};


export type QueryFilesCountArgs = {
  where?: FileWhereInput;
};


export type QueryManySettingsArgs = {
  orderBy?: Array<SettingsOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: SettingsWhereInput;
};


export type QueryManySettingsCountArgs = {
  where?: SettingsWhereInput;
};


export type QueryOrderArgs = {
  where: OrderWhereUniqueInput;
};


export type QueryOrderItemArgs = {
  where: OrderItemWhereUniqueInput;
};


export type QueryOrderItemsArgs = {
  orderBy?: Array<OrderItemOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: OrderItemWhereInput;
};


export type QueryOrderItemsCountArgs = {
  where?: OrderItemWhereInput;
};


export type QueryOrdersArgs = {
  orderBy?: Array<OrderOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: OrderWhereInput;
};


export type QueryOrdersCountArgs = {
  where?: OrderWhereInput;
};


export type QueryPostArgs = {
  where: PostWhereUniqueInput;
};


export type QueryPostsArgs = {
  orderBy?: Array<PostOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: PostWhereInput;
};


export type QueryPostsCountArgs = {
  where?: PostWhereInput;
};


export type QuerySettingsArgs = {
  where?: SettingsWhereUniqueInput;
};


export type QueryTagArgs = {
  where: TagWhereUniqueInput;
};


export type QueryTagsArgs = {
  orderBy?: Array<TagOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: TagWhereInput;
};


export type QueryTagsCountArgs = {
  where?: TagWhereInput;
};


export type QueryTeacherArgs = {
  where: TeacherWhereUniqueInput;
};


export type QueryTeachersArgs = {
  orderBy?: Array<TeacherOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: TeacherWhereInput;
};


export type QueryTeachersCountArgs = {
  where?: TeacherWhereInput;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: UserWhereInput;
};


export type QueryUsersCountArgs = {
  where?: UserWhereInput;
};


export type QueryValidateUserPasswordResetTokenArgs = {
  email: Scalars['String'];
  token: Scalars['String'];
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type RedeemUserPasswordResetTokenResult = {
  __typename?: 'RedeemUserPasswordResetTokenResult';
  code: PasswordResetRedemptionErrorCode;
  message: Scalars['String'];
};

export type Settings = {
  __typename?: 'Settings';
  copyrightText?: Maybe<Scalars['String']>;
  highlightedPosts?: Maybe<Array<Post>>;
  highlightedPostsCount?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  jobsList?: Maybe<Array<Scalars['String']>>;
  websiteName?: Maybe<Scalars['String']>;
};


export type SettingsHighlightedPostsArgs = {
  orderBy?: Array<PostOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: PostWhereInput;
};


export type SettingsHighlightedPostsCountArgs = {
  where?: PostWhereInput;
};

export type SettingsCreateInput = {
  copyrightText?: InputMaybe<Scalars['String']>;
  highlightedPosts?: InputMaybe<PostRelateToManyForCreateInput>;
  jobsList?: InputMaybe<Array<Scalars['String']>>;
  websiteName?: InputMaybe<Scalars['String']>;
};

export type SettingsOrderByInput = {
  copyrightText?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  websiteName?: InputMaybe<OrderDirection>;
};

export type SettingsUpdateArgs = {
  data: SettingsUpdateInput;
  where?: SettingsWhereUniqueInput;
};

export type SettingsUpdateInput = {
  copyrightText?: InputMaybe<Scalars['String']>;
  highlightedPosts?: InputMaybe<PostRelateToManyForUpdateInput>;
  jobsList?: InputMaybe<Array<Scalars['String']>>;
  websiteName?: InputMaybe<Scalars['String']>;
};

export type SettingsWhereInput = {
  AND?: InputMaybe<Array<SettingsWhereInput>>;
  NOT?: InputMaybe<Array<SettingsWhereInput>>;
  OR?: InputMaybe<Array<SettingsWhereInput>>;
  copyrightText?: InputMaybe<StringFilter>;
  highlightedPosts?: InputMaybe<PostManyRelationFilter>;
  id?: InputMaybe<IdFilter>;
  websiteName?: InputMaybe<StringFilter>;
};

export type SettingsWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Post>>;
  postsCount?: Maybe<Scalars['Int']>;
};


export type TagPostsArgs = {
  orderBy?: Array<PostOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: PostWhereInput;
};


export type TagPostsCountArgs = {
  where?: PostWhereInput;
};

export type TagCreateInput = {
  name?: InputMaybe<Scalars['String']>;
  posts?: InputMaybe<PostRelateToManyForCreateInput>;
};

export type TagManyRelationFilter = {
  every?: InputMaybe<TagWhereInput>;
  none?: InputMaybe<TagWhereInput>;
  some?: InputMaybe<TagWhereInput>;
};

export type TagOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type TagRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>;
  create?: InputMaybe<Array<TagCreateInput>>;
};

export type TagRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>;
  create?: InputMaybe<Array<TagCreateInput>>;
  disconnect?: InputMaybe<Array<TagWhereUniqueInput>>;
  set?: InputMaybe<Array<TagWhereUniqueInput>>;
};

export type TagUpdateArgs = {
  data: TagUpdateInput;
  where: TagWhereUniqueInput;
};

export type TagUpdateInput = {
  name?: InputMaybe<Scalars['String']>;
  posts?: InputMaybe<PostRelateToManyForUpdateInput>;
};

export type TagWhereInput = {
  AND?: InputMaybe<Array<TagWhereInput>>;
  NOT?: InputMaybe<Array<TagWhereInput>>;
  OR?: InputMaybe<Array<TagWhereInput>>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  posts?: InputMaybe<PostManyRelationFilter>;
};

export type TagWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Teacher = {
  __typename?: 'Teacher';
  courses?: Maybe<Array<Course>>;
  coursesCount?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<ImageFieldOutput>;
  name?: Maybe<Scalars['String']>;
};


export type TeacherCoursesArgs = {
  orderBy?: Array<CourseOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CourseWhereInput;
};


export type TeacherCoursesCountArgs = {
  where?: CourseWhereInput;
};

export type TeacherCreateInput = {
  courses?: InputMaybe<CourseRelateToManyForCreateInput>;
  description?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<ImageFieldInput>;
  name?: InputMaybe<Scalars['String']>;
};

export type TeacherOrderByInput = {
  description?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type TeacherRelateToOneForCreateInput = {
  connect?: InputMaybe<TeacherWhereUniqueInput>;
  create?: InputMaybe<TeacherCreateInput>;
};

export type TeacherRelateToOneForUpdateInput = {
  connect?: InputMaybe<TeacherWhereUniqueInput>;
  create?: InputMaybe<TeacherCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export type TeacherUpdateArgs = {
  data: TeacherUpdateInput;
  where: TeacherWhereUniqueInput;
};

export type TeacherUpdateInput = {
  courses?: InputMaybe<CourseRelateToManyForUpdateInput>;
  description?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<ImageFieldInput>;
  name?: InputMaybe<Scalars['String']>;
};

export type TeacherWhereInput = {
  AND?: InputMaybe<Array<TeacherWhereInput>>;
  NOT?: InputMaybe<Array<TeacherWhereInput>>;
  OR?: InputMaybe<Array<TeacherWhereInput>>;
  courses?: InputMaybe<CourseManyRelationFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
};

export type TeacherWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type User = {
  __typename?: 'User';
  cart?: Maybe<Array<Cart>>;
  cartCount?: Maybe<Scalars['Int']>;
  comments?: Maybe<Array<Comment>>;
  commentsCount?: Maybe<Scalars['Int']>;
  courses?: Maybe<Array<Course>>;
  coursesCount?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  events?: Maybe<Array<Event>>;
  eventsCount?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  orders?: Maybe<Array<Order>>;
  ordersCount?: Maybe<Scalars['Int']>;
  password?: Maybe<PasswordState>;
  passwordResetIssuedAt?: Maybe<Scalars['DateTime']>;
  passwordResetRedeemedAt?: Maybe<Scalars['DateTime']>;
  passwordResetToken?: Maybe<PasswordState>;
  posts?: Maybe<Array<Post>>;
  postsCount?: Maybe<Scalars['Int']>;
  role?: Maybe<Scalars['String']>;
};


export type UserCartArgs = {
  orderBy?: Array<CartOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CartWhereInput;
};


export type UserCartCountArgs = {
  where?: CartWhereInput;
};


export type UserCommentsArgs = {
  orderBy?: Array<CommentOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CommentWhereInput;
};


export type UserCommentsCountArgs = {
  where?: CommentWhereInput;
};


export type UserCoursesArgs = {
  orderBy?: Array<CourseOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CourseWhereInput;
};


export type UserCoursesCountArgs = {
  where?: CourseWhereInput;
};


export type UserEventsArgs = {
  orderBy?: Array<EventOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: EventWhereInput;
};


export type UserEventsCountArgs = {
  where?: EventWhereInput;
};


export type UserOrdersArgs = {
  orderBy?: Array<OrderOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: OrderWhereInput;
};


export type UserOrdersCountArgs = {
  where?: OrderWhereInput;
};


export type UserPostsArgs = {
  orderBy?: Array<PostOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: PostWhereInput;
};


export type UserPostsCountArgs = {
  where?: PostWhereInput;
};

export type UserAuthenticationWithPasswordFailure = {
  __typename?: 'UserAuthenticationWithPasswordFailure';
  message: Scalars['String'];
};

export type UserAuthenticationWithPasswordResult = UserAuthenticationWithPasswordFailure | UserAuthenticationWithPasswordSuccess;

export type UserAuthenticationWithPasswordSuccess = {
  __typename?: 'UserAuthenticationWithPasswordSuccess';
  item: User;
  sessionToken: Scalars['String'];
};

export type UserCreateInput = {
  cart?: InputMaybe<CartRelateToManyForCreateInput>;
  comments?: InputMaybe<CommentRelateToManyForCreateInput>;
  courses?: InputMaybe<CourseRelateToManyForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  events?: InputMaybe<EventRelateToManyForCreateInput>;
  lastName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  orders?: InputMaybe<OrderRelateToManyForCreateInput>;
  password?: InputMaybe<Scalars['String']>;
  passwordResetIssuedAt?: InputMaybe<Scalars['DateTime']>;
  passwordResetRedeemedAt?: InputMaybe<Scalars['DateTime']>;
  passwordResetToken?: InputMaybe<Scalars['String']>;
  posts?: InputMaybe<PostRelateToManyForCreateInput>;
  role?: InputMaybe<Scalars['String']>;
};

export type UserManyRelationFilter = {
  every?: InputMaybe<UserWhereInput>;
  none?: InputMaybe<UserWhereInput>;
  some?: InputMaybe<UserWhereInput>;
};

export type UserOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  lastName?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  passwordResetIssuedAt?: InputMaybe<OrderDirection>;
  passwordResetRedeemedAt?: InputMaybe<OrderDirection>;
  role?: InputMaybe<OrderDirection>;
};

export type UserRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  create?: InputMaybe<Array<UserCreateInput>>;
};

export type UserRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  create?: InputMaybe<Array<UserCreateInput>>;
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
};

export type UserRelateToOneForCreateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
};

export type UserRelateToOneForUpdateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export type UserUpdateArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateInput = {
  cart?: InputMaybe<CartRelateToManyForUpdateInput>;
  comments?: InputMaybe<CommentRelateToManyForUpdateInput>;
  courses?: InputMaybe<CourseRelateToManyForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  events?: InputMaybe<EventRelateToManyForUpdateInput>;
  lastName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  orders?: InputMaybe<OrderRelateToManyForUpdateInput>;
  password?: InputMaybe<Scalars['String']>;
  passwordResetIssuedAt?: InputMaybe<Scalars['DateTime']>;
  passwordResetRedeemedAt?: InputMaybe<Scalars['DateTime']>;
  passwordResetToken?: InputMaybe<Scalars['String']>;
  posts?: InputMaybe<PostRelateToManyForUpdateInput>;
  role?: InputMaybe<Scalars['String']>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  cart?: InputMaybe<CartManyRelationFilter>;
  comments?: InputMaybe<CommentManyRelationFilter>;
  courses?: InputMaybe<CourseManyRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  email?: InputMaybe<StringFilter>;
  events?: InputMaybe<EventManyRelationFilter>;
  id?: InputMaybe<IdFilter>;
  lastName?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  orders?: InputMaybe<OrderManyRelationFilter>;
  passwordResetIssuedAt?: InputMaybe<DateTimeNullableFilter>;
  passwordResetRedeemedAt?: InputMaybe<DateTimeNullableFilter>;
  passwordResetToken?: InputMaybe<PasswordFilter>;
  posts?: InputMaybe<PostManyRelationFilter>;
  role?: InputMaybe<StringNullableFilter>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type ValidateUserPasswordResetTokenResult = {
  __typename?: 'ValidateUserPasswordResetTokenResult';
  code: PasswordResetRedemptionErrorCode;
  message: Scalars['String'];
};

export type CreateCommentMutationVariables = Exact<{
  data: CommentCreateInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment?: { __typename?: 'Comment', id: string } | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', endSession: boolean };

export type SetRateMutationVariables = Exact<{
  courseId: Scalars['ID'];
  rate: Scalars['Int'];
  comment: Scalars['String'];
}>;


export type SetRateMutation = { __typename?: 'Mutation', createComment?: { __typename?: 'Comment', id: string } | null };

export type SigninMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SigninMutation = { __typename?: 'Mutation', authenticateUserWithPassword?: { __typename?: 'UserAuthenticationWithPasswordFailure', message: string } | { __typename?: 'UserAuthenticationWithPasswordSuccess', sessionToken: string, item: { __typename?: 'User', id: string, lastName?: string | null, name?: string | null, email?: string | null } } | null };

export type UpdateMyInfoMutationVariables = Exact<{
  id: Scalars['ID'];
  name: Scalars['String'];
  lastName: Scalars['String'];
}>;


export type UpdateMyInfoMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', id: string } | null };

export type AuthitemQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthitemQuery = { __typename?: 'Query', authenticatedItem?: { __typename?: 'User', id: string, email?: string | null, name?: string | null, lastName?: string | null } | null };

export type CartByUserQueryVariables = Exact<{
  user: Scalars['ID'];
}>;


export type CartByUserQuery = { __typename?: 'Query', carts?: Array<{ __typename?: 'Cart', id: string, totalPrice?: number | null, items?: Array<{ __typename?: 'CartItem', id: string, priceWithDiscount?: number | null, type?: string | null, coupon?: { __typename?: 'Coupon', id: string, code?: number | null, discount?: number | null } | null, course?: { __typename?: 'Course', id: string, name?: string | null, priceFa?: string | null, price?: number | null, image?: { __typename?: 'ImageFieldOutput', id: string, url: string } | null } | null, event?: { __typename?: 'Event', id: string, name?: string | null, price?: number | null, priceFa?: string | null, image?: { __typename?: 'ImageFieldOutput', id: string, url: string } | null } | null }> | null }> | null };

export type CourseItemQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CourseItemQuery = { __typename?: 'Query', courseItem?: { __typename?: 'CourseItem', id: string, no?: number | null, name?: string | null, description?: string | null, commentsCount?: number | null, comments?: Array<{ __typename?: 'Comment', id: string, comment?: string | null, user?: { __typename?: 'User', name?: string | null } | null }> | null, video?: { __typename?: 'File', id: string, video?: { __typename?: 'FileFieldOutput', filename: string, url: string } | null } | null } | null };

export type CourseItemsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CourseItemsQuery = { __typename?: 'Query', courseItems?: Array<{ __typename?: 'CourseItem', id: string, no?: number | null, name?: string | null }> | null };

export type CourseQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CourseQuery = { __typename?: 'Query', course?: { __typename?: 'Course', id: string, name?: string | null, description?: string | null, rate?: number | null, commentsCount?: number | null, teacher?: { __typename?: 'Teacher', name?: string | null, description?: string | null, image?: { __typename?: 'ImageFieldOutput', id: string, url: string } | null } | null, image?: { __typename?: 'ImageFieldOutput', id: string, url: string } | null, courseItem?: Array<{ __typename?: 'CourseItem', id: string, no?: number | null, name?: string | null, description?: string | null }> | null } | null };

export type CoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type CoursesQuery = { __typename?: 'Query', courses?: Array<{ __typename?: 'Course', id: string, name?: string | null, description?: string | null, isAccessible?: boolean | null, price?: number | null, image?: { __typename?: 'ImageFieldOutput', id: string, url: string } | null, teacher?: { __typename?: 'Teacher', name?: string | null, id: string, image?: { __typename?: 'ImageFieldOutput', id: string, url: string } | null } | null }> | null };

export type EventQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type EventQuery = { __typename?: 'Query', event?: { __typename?: 'Event', id: string, name?: string | null, from?: string | null, to?: string | null, description?: string | null, location?: string | null, price?: number | null, priceFa?: string | null, status?: string | null, isAccessible?: boolean | null, isUpcomming?: boolean | null, isOpen?: boolean | null, remaining?: number | null, content?: { __typename?: 'Event_content_Document', document: any } | null, image?: { __typename?: 'ImageFieldOutput', id: string, url: string } | null } | null };

export type EventsQueryVariables = Exact<{ [key: string]: never; }>;


export type EventsQuery = { __typename?: 'Query', events?: Array<{ __typename?: 'Event', id: string, name?: string | null, from?: string | null, to?: string | null, description?: string | null, price?: number | null, priceFa?: string | null, status?: string | null, isAccessible?: boolean | null, isUpcomming?: boolean | null, isOpen?: boolean | null, remaining?: number | null, image?: { __typename?: 'ImageFieldOutput', id: string, url: string } | null }> | null };

export type MyCoursesQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MyCoursesQuery = { __typename?: 'Query', user?: { __typename?: 'User', courses?: Array<{ __typename?: 'Course', id: string, name?: string | null, rate?: number | null, commentsCount?: number | null, image?: { __typename?: 'ImageFieldOutput', url: string } | null, teacher?: { __typename?: 'Teacher', id: string, name?: string | null, image?: { __typename?: 'ImageFieldOutput', url: string } | null } | null }> | null } | null };

export type MyProfileQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MyProfileQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, name?: string | null, lastName?: string | null, email?: string | null, coursesCount?: number | null, commentsCount?: number | null, eventsCount?: number | null, orders?: Array<{ __typename?: 'Order', id: string, totalCost?: number | null, paymentStatus?: number | null, orderDate?: any | null }> | null } | null };

export type OrderQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type OrderQuery = { __typename?: 'Query', order?: { __typename?: 'Order', id: string, totalCost?: number | null, trackId?: string | null, orderDate?: any | null } | null };

export type UserCommentAndRateQueryVariables = Exact<{
  userId: Scalars['ID'];
  courseId: Scalars['ID'];
}>;


export type UserCommentAndRateQuery = { __typename?: 'Query', comments?: Array<{ __typename?: 'Comment', rate?: number | null, comment?: string | null }> | null };
