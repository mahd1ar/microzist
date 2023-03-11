-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "lastName" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL,
    "status" TEXT DEFAULT 'enable',
    "role" TEXT DEFAULT '100',
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "passwordResetToken" TEXT,
    "passwordResetIssuedAt" DATETIME,
    "passwordResetRedeemedAt" DATETIME
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "image_filesize" INTEGER,
    "image_extension" TEXT,
    "image_width" INTEGER,
    "image_height" INTEGER,
    "image_id" TEXT
);

-- CreateTable
CREATE TABLE "Coupon" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "maxAmount" INTEGER NOT NULL,
    "discount" INTEGER
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "image_filesize" INTEGER,
    "image_extension" TEXT,
    "image_width" INTEGER,
    "image_height" INTEGER,
    "image_id" TEXT,
    "description" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "price" INTEGER,
    "maxAmount" INTEGER NOT NULL,
    "status" TEXT DEFAULT 'DRAFT',
    "from" TEXT,
    "to" TEXT,
    "registrationDeadline" TEXT,
    "location" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "example" TEXT,
    "my_date" TEXT NOT NULL DEFAULT '1970-01-01',
    "author" TEXT,
    CONSTRAINT "Post_author_fkey" FOREIGN KEY ("author") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "status" TEXT DEFAULT 'DRAFT',
    "price" INTEGER,
    "teacher" TEXT,
    "image_filesize" INTEGER,
    "image_extension" TEXT,
    "image_width" INTEGER,
    "image_height" INTEGER,
    "image_id" TEXT,
    CONSTRAINT "Course_teacher_fkey" FOREIGN KEY ("teacher") REFERENCES "Teacher" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CourseItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "no" INTEGER,
    "name" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "video" TEXT,
    "course" TEXT,
    CONSTRAINT "CourseItem_video_fkey" FOREIGN KEY ("video") REFERENCES "File" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "CourseItem_course_fkey" FOREIGN KEY ("course") REFERENCES "Course" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "priority" INTEGER DEFAULT 0
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "altText" TEXT NOT NULL DEFAULT '',
    "video_filesize" INTEGER,
    "video_filename" TEXT,
    "type" TEXT,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "websiteName" TEXT NOT NULL DEFAULT '',
    "copyrightText" TEXT NOT NULL DEFAULT '',
    "jobsList" TEXT NOT NULL DEFAULT '[]'
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "course" TEXT,
    "event" TEXT,
    "quantity" INTEGER DEFAULT 1,
    "coupon" TEXT,
    "cart" TEXT,
    CONSTRAINT "CartItem_course_fkey" FOREIGN KEY ("course") REFERENCES "Course" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "CartItem_event_fkey" FOREIGN KEY ("event") REFERENCES "Event" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "CartItem_coupon_fkey" FOREIGN KEY ("coupon") REFERENCES "Coupon" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "CartItem_cart_fkey" FOREIGN KEY ("cart") REFERENCES "Cart" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user" TEXT,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Cart_user_fkey" FOREIGN KEY ("user") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "totalCost" REAL,
    "trackId" TEXT NOT NULL DEFAULT '',
    "user" TEXT,
    "paymentStatus" INTEGER DEFAULT 0,
    "orderDate" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Order_user_fkey" FOREIGN KEY ("user") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "course" TEXT,
    "event" TEXT,
    "quantity" INTEGER DEFAULT 1,
    "price" INTEGER,
    "order" TEXT,
    CONSTRAINT "OrderItem_course_fkey" FOREIGN KEY ("course") REFERENCES "Course" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_event_fkey" FOREIGN KEY ("event") REFERENCES "Event" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_order_fkey" FOREIGN KEY ("order") REFERENCES "Order" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "comment" TEXT NOT NULL DEFAULT '',
    "user" TEXT,
    "course" TEXT,
    "courseItem" TEXT,
    "isValidated" BOOLEAN NOT NULL DEFAULT true,
    "rate" INTEGER DEFAULT -1,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Comment_user_fkey" FOREIGN KEY ("user") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Comment_course_fkey" FOREIGN KEY ("course") REFERENCES "Course" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Comment_courseItem_fkey" FOREIGN KEY ("courseItem") REFERENCES "CourseItem" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_Coupon_belongsTo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_Coupon_belongsTo_A_fkey" FOREIGN KEY ("A") REFERENCES "Coupon" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_Coupon_belongsTo_B_fkey" FOREIGN KEY ("B") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_Event_users" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_Event_users_A_fkey" FOREIGN KEY ("A") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_Event_users_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_Post_tags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_Post_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_Post_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_Settings_highlightedPosts" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_Settings_highlightedPosts_A_fkey" FOREIGN KEY ("A") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_Settings_highlightedPosts_B_fkey" FOREIGN KEY ("B") REFERENCES "Settings" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_Course_users" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_Course_users_A_fkey" FOREIGN KEY ("A") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_Course_users_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_Category_parentId" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_Category_parentId_A_fkey" FOREIGN KEY ("A") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_Category_parentId_B_fkey" FOREIGN KEY ("B") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Post_my_date_key" ON "Post"("my_date");

-- CreateIndex
CREATE INDEX "Post_author_idx" ON "Post"("author");

-- CreateIndex
CREATE INDEX "Course_teacher_idx" ON "Course"("teacher");

-- CreateIndex
CREATE INDEX "CourseItem_video_idx" ON "CourseItem"("video");

-- CreateIndex
CREATE INDEX "CourseItem_course_idx" ON "CourseItem"("course");

-- CreateIndex
CREATE INDEX "CartItem_course_idx" ON "CartItem"("course");

-- CreateIndex
CREATE INDEX "CartItem_event_idx" ON "CartItem"("event");

-- CreateIndex
CREATE INDEX "CartItem_coupon_idx" ON "CartItem"("coupon");

-- CreateIndex
CREATE INDEX "CartItem_cart_idx" ON "CartItem"("cart");

-- CreateIndex
CREATE INDEX "Cart_user_idx" ON "Cart"("user");

-- CreateIndex
CREATE INDEX "Order_user_idx" ON "Order"("user");

-- CreateIndex
CREATE INDEX "OrderItem_course_idx" ON "OrderItem"("course");

-- CreateIndex
CREATE INDEX "OrderItem_event_idx" ON "OrderItem"("event");

-- CreateIndex
CREATE INDEX "OrderItem_order_idx" ON "OrderItem"("order");

-- CreateIndex
CREATE INDEX "Comment_user_idx" ON "Comment"("user");

-- CreateIndex
CREATE INDEX "Comment_course_idx" ON "Comment"("course");

-- CreateIndex
CREATE INDEX "Comment_courseItem_idx" ON "Comment"("courseItem");

-- CreateIndex
CREATE UNIQUE INDEX "_Coupon_belongsTo_AB_unique" ON "_Coupon_belongsTo"("A", "B");

-- CreateIndex
CREATE INDEX "_Coupon_belongsTo_B_index" ON "_Coupon_belongsTo"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Event_users_AB_unique" ON "_Event_users"("A", "B");

-- CreateIndex
CREATE INDEX "_Event_users_B_index" ON "_Event_users"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Post_tags_AB_unique" ON "_Post_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_Post_tags_B_index" ON "_Post_tags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Settings_highlightedPosts_AB_unique" ON "_Settings_highlightedPosts"("A", "B");

-- CreateIndex
CREATE INDEX "_Settings_highlightedPosts_B_index" ON "_Settings_highlightedPosts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Course_users_AB_unique" ON "_Course_users"("A", "B");

-- CreateIndex
CREATE INDEX "_Course_users_B_index" ON "_Course_users"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Category_parentId_AB_unique" ON "_Category_parentId"("A", "B");

-- CreateIndex
CREATE INDEX "_Category_parentId_B_index" ON "_Category_parentId"("B");
