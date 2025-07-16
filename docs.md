# buổi 2

generate prisma client => ` npx prisma generate --schema=./prisma/schema.prisma` => nó sẽ đẩy cái file generated vào node_modules/@prisma/sdk

nhưng trong db trong postgres thì chưa có cái table `stock` và `post`

chạy `npm run prisma:migration:generate` để tạo cái migration file

# các trường hợp thường gặp khi lỗi

khi đã có data trong table => thêm 1 cái trường vào schema require vào => conflict => xem đẫ có data chưa => làm sao để sửa

c1 => đưa nó về optional. sau khi đã fill đủ => đưa lại nó về require

c2 => thêm default value "" vào là ok

## lỗi 2 => data đang có trường desc, xóa cái schema desc trong schema.prisma => lỗi

báo warning => nhưng vẫn chạy được => nhưng ko nên thế này

tại sao đã có generate rồi mà vẫn cần cái generate-client => vẫn cần do 1 cái client, 1 cái cho lên db thật

khi 2 ng code, 1 ng đã migrate rồi => ng kia chỉ cần chạy `generate-client` thôi để có sdk cần dùng thôi

lệnh deploy => chạy lệnh này để deploy lên db thật

khi pull 1 cái repo về thì chạy lệnh deploy để áp vòa local của mình

1pr ko nên để quá nhiều cái migration trong prisma

=> xóa hết các migration => rồi migrate lại
