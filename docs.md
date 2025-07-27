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

# cào data từ vnredirect

tạo lib => `nest g lib vndirect-client` => có hỏi 1 câu thì điền `@manh` (hoặc bất kì @ gì tùy cty)

khi đó ở bên cái nest cli

```ts
// @manh là cái định nghĩa ở trên
"@manh/vndirect-client": {
      "type": "library",
      "root": "libs/vndirect-client",
      "entryFile": "index",
      "sourceRoot": "libs/vndirect-client/src",
      "compilerOptions": {
        "tsConfigPath": "libs/vndirect-client/tsconfig.lib.json"
      }
    }
```

call api trong nest => http module

docs `https://docs.nestjs.com/techniques/http-module`

cài

```bash
npm i @nestjs/axios axios
```

code trong lib => code => done

khi call xong api => sang bên dùng => format lại dữ liệu trả về

=> tạo `domain/integration-vndirect`

# buổi 3

giải quyết vấn đề gì?

## cronjob

## cli để chạy cái cralData vndirect

thư viện `nestjs commander`

docs có thì `https://docs.nestjs.com/recipes/nest-commander`

nếu làm như docs thì nó sẽ phỉa sử dụng trong cái file `main.ts` mà file main đang run bộ api của mình rồi => có thể nó sẽ lỗi => do 2 môi trường khác nhau => lỗi

cách đơn giản hơn => tạo `cli-main.ts` => đưa cái cli vào đây => share cùng 1 cái `app.module` => sẽ có vấn đề gì => nó sẽ chạy nhiều lần cái `app.module` (in ra nhiều cái api (phải chạy nhiều cái) => tốn tài nguyên do app.module => chạy hết các restfull api trước => đến hết => phải load trước nên nó tốn thời gian) => hạn chế đưa app module nhất có thể => best practice

tương tự cái app.module.ts => `cli-app.module.ts` => monorepo

tại sao phải để 2 cái app chạy độc lập trong folder app => tạo thêm 1 cái application riêng cho cli => `nest g app cli-service` khi deploy ko cần cái này lên làm gì cả

`main.ts`

```ts
import { AppModule } from 'apps/cli-service/src/app.module';
import { CommandFactory } from 'nest-commander';

async function bootstrap() {
  await CommandFactory.run(AppModule, {
    logger: ['debug', 'verbose', 'log', 'warn', 'error'],
  });
}

bootstrap();
```

tạo file `app.module.ts`

```ts
import { Module } from '@nestjs/common';

@Module({})
export class AppModule {}
```

viết test 1 file `basic.command.ts`

```ts
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Command, CommandRunner, Option } from 'nest-commander';

interface BasicCommandOptions {
  string?: string;
  boolean?: boolean;
  number?: number;
}

@Command({ name: 'basic', description: 'A parameter parse' })
export class BasicCommand extends CommandRunner {
  async run(
    passedParam: string[],
    options?: BasicCommandOptions,
  ): Promise<void> {
    if (options?.boolean !== undefined && options?.boolean !== null) {
      this.runWithBoolean(passedParam, options.boolean);
    } else if (options?.number) {
      this.runWithNumber(passedParam, options.number);
    } else if (options?.string) {
      this.runWithString(passedParam, options.string);
    } else {
      this.runWithNone(passedParam);
    }
  }

  @Option({
    flags: '-n, --number [number]',
    description: 'A basic number parser',
  })
  parseNumber(val: string): number {
    return Number(val);
  }

  @Option({
    flags: '-s, --string [string]',
    description: 'A string return',
  })
  parseString(val: string): string {
    return val;
  }

  @Option({
    flags: '-b, --boolean [boolean]',
    description: 'A boolean parser',
  })
  parseBoolean(val: string): boolean {
    return JSON.parse(val);
  }

  runWithString(param: string[], option: string): void {
    console.log({ param, string: option });
  }

  runWithNumber(param: string[], option: number): void {
    console.log({ param, number: option });
  }

  runWithBoolean(param: string[], option: boolean): void {
    console.log({ param, boolean: option });
  }

  runWithNone(param: string[]): void {
    console.log({ param });
  }
}
```

import vào `app.module.ts`

```ts
import { Module } from '@nestjs/common';
import { BasicCommand } from 'apps/cli-service/src/basic.command';

@Module({
  providers: [BasicCommand],
  imports: [],
})
export class AppModule {}
```

thêm các `package.json` vào các service => xong đó quay lại cái file `package.json` của root =>

```ts
  "workspaces": {
    "packages": [
      "./apps/*",
      "./libs/*"
    ]
  },
```

khi chạy `npm start:dev` => sẽ lấy cái trong root của `nest-cli.json`

làm sao để biết được là chạy cái nào đằng sau

```json
    "start:dev:api": "nest start --watch @apps/api-service",
    "start:dev:cli": "nest start --watch @apps/cli-service",
    "start:dev:cron": "nest start --watch @apps/cron-service",
    // @apps/api-service là cái khai báo trong nest cli (phải đúng thế này)
    /**
"@apps/cli-service": {
      "type": "application",
      "root": "apps/cli-service",
      "entryFile": "main",
      "sourceRoot": "apps/cli-service/src",
      "compilerOptions": {
        "tsConfigPath": "apps/cli-service/tsconfig.app.json"
      }
    },
    */

```

khi đó chạy `npm run start:dev:cli` => sẽ ra được như sau

```json
webpack 5.99.6 compiled successfully in 770 ms
Type-checking in progress...
[Nest] 10492  - 07/25/2025, 3:51:57 PM     LOG [NestFactory] Starting Nest application...
[Nest] 10492  - 07/25/2025, 3:51:57 PM     LOG [InstanceLoader] CommandRootModule dependencies initialized +15ms
[Nest] 10492  - 07/25/2025, 3:51:57 PM     LOG [InstanceLoader] AppModule dependencies initialized +1ms
[Nest] 10492  - 07/25/2025, 3:51:57 PM     LOG [InstanceLoader] DiscoveryModule dependencies initialized +0ms
[Nest] 10492  - 07/25/2025, 3:51:57 PM     LOG [InstanceLoader] CommandRunnerModule dependencies initialized +1ms
Usage: main [options] [command]

Options:
  -h, --help       display help for command

Commands:
  basic [options]  A parameter parse
  help [command]   display help for command
No typescript errors found.
```

chạy thêm `npm run start:dev:cli -h` để xem có nhwungx cái gì

` npm run start:dev:cli basic` => xem

=> done phần xử lí nhiều service trên 1 project

### vào command chính

sửa trong cái `package.json` gốc

chạy `npm run start:cli basic` => ra được `{ param: [] }`

chạy `npm run start:cli -- basic -n 11` thì sẽ ra được `{ param: [], number: 11 }`

### áp dụng vào bài VNDirect

viết cái `apps\cli-service\src\stock-processor\stock-processor.service.ts` nó tương tự như cái service của `apps\api-service\src\domain\integration-vndirect\intergration-vndirect.service.ts`

```ts
import { VndirectClientService } from '@manh/vndirect-client';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DatabaseService } from 'apps/api-service/src/database/database.service';

@Injectable()
export class StockProcessorService {
  private logger = new Logger(StockProcessorService.name);
  constructor(
    private readonly vndirectClientService: VndirectClientService,
    private readonly databaseService: DatabaseService,
  ) {}

  async processStocks() {
    const stocks = await this.vndirectClientService.getStocks();

    const processedStocks = stocks.map((stock) => {
      return {
        symbol: stock?.code,
        companyName: stock.companyName,
      };
    });

    try {
      this.logger.log(`Processing ${processedStocks.length} stocks...`);
      await this.databaseService.stock.createMany({
        data: processedStocks,
        skipDuplicates: true,
      });

      this.logger.log('Stocks processed and saved to database successfully.');
    } catch (error) {
      this.logger.error('Error processing stocks:', error);
      throw new InternalServerErrorException('Failed to process stocks');
    }
  }
}
```

copy y nguyên sang thì xóa cái bên `intergration-vndirect.service.ts` đi nhwung để test xong r xóa thì đánh dấu nó là

```ts
/**
 * @deprecated
 */
```

thì bên controller sử dụng cái hàm kia bên service => nó sẽ bị gạch ngang (như 1 hàm đã hết hỗ trợ)

thấy cái `stock-pro.service.ts` cần cái db => tạm thời copy cái db ném vào cái `cli-ser/src` (còn 1 cái trò là ném cái database thành cái lib riêng) => done

chuẩn cấu trúc thư mục

src/commands/stock-processor => gọi lại cái stock trong cái models

src/models/stock => cái này sẽ là cái crud vào db của mình

code `stock.module.ts` trước

```ts
import { Module } from '@nestjs/common';
import { StockService } from './stock.service';

@Module({
  providers: [StockService],
  exports: [StockService], // do cái stock-processor sẽ dùng nên phải có cả export
})
export class StockModule {}
```

code `stock.service.ts`

```ts
import { Injectable, Logger } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class StockService {
  private readonly logger = new Logger(StockService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  async createMany(data: CreateStockDto[]) {
    try {
      this.logger.log(`Creating ${data.length} stocks...`);
      return await this.databaseService.stock.createMany({
        data,
        skipDuplicates: true,
      });
    } catch (error) {
      this.logger.error('Failed to create stocks:', error);
      throw new Error(`Failed to create stocks: ${error.message}`);
    }
  }
}
```

dùng bên `stock-processor.module.ts`

```ts
import { Module } from '@nestjs/common';
import { StockModule } from '../../models/stock/stock.module';
import { StockProcessorService } from './stock-processor.service';

@Module({
  imports: [StockModule],
  providers: [StockProcessorService],
})
export class StockProcessorModule {}
```

khi đó sửa lại cái `stock-pro.service`

```ts
import { VndirectClientService } from '@manh/vndirect-client';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { StockService } from '../../models/stock/stock.service';

@Injectable()
export class StockProcessorService {
  private logger = new Logger(StockProcessorService.name);
  constructor(
    private readonly vndirectClientService: VndirectClientService,
    private readonly stockService: StockService,
  ) {}

  async processStocks() {
    const stocks = await this.vndirectClientService.getStocks();

    const processedStocks = stocks.map((stock) => {
      return {
        symbol: stock?.code,
        companyName: stock.companyName,
      };
    });

    try {
      this.logger.log(`Processing ${processedStocks.length} stocks...`);
      await this.stockService.createMany(processedStocks);
      this.logger.log('Stocks processed and saved to database successfully.');
    } catch (error) {
      this.logger.error('Error processing stocks:', error);
      throw new InternalServerErrorException('Failed to process stocks');
    }
  }
}
```

viết command ở file `stock-processor.service.ts`

```ts
import { Command, CommandRunner } from 'nest-commander';
import { StockProcessorService } from './stock-processor.service';

@Command({ name: 'process-stocks', description: 'Process stocks' })
export class StockProcessorCommand extends CommandRunner {
  constructor(private readonly stockProcessorService: StockProcessorService) {
    super();
  }

  async run(): Promise<void> {
    await this.stockProcessorService.processStocks();
  }
}
```

trong `app.module` của cli-service

```ts
import { Module } from '@nestjs/common';
import { BasicCommand } from './basic.command';
import { StockProcessorModule } from './commands/stock-processor/stock-processor.module';

@Module({
  providers: [BasicCommand],
  imports: [StockProcessorModule, DatabaseModule],
})
export class AppModule {}
```

trong cái `stock-processor.module.ts`

```ts
import { Module } from '@nestjs/common';
import { StockModule } from '../../models/stock/stock.module';
import { StockProcessorService } from './stock-processor.service';
import { VndirectClientModule } from '../../../../../libs/vndirect-client/src';
import { StockProcessorCommand } from './stock-processor.command';

@Module({
  imports: [StockModule, VndirectClientModule],
  providers: [StockProcessorService, StockProcessorCommand],
})
export class StockProcessorModule {}
```

=> chạy bằng `npm run start:cli process-stocks`

### fix import

tại lỗi ở đây `import { VndirectClientService } from '../../../../../libs/vndirect-client/src';`

##

vấn đề

```ts
 method: 'GET',
          url: 'https://api-finfo.vndirect.com.vn/v4/stocks',
          params: {
            q: 'type:STOCK~status:LISTED',
            size: 3000,
          },
        })
```

lặp cái này

hoặc là cái đầu api phải là dynamic url ví dụ {{url}}/v4/... + tự định nghĩa interface => nhập nhằng

refactor cái `vn-client.service` để làm gì

khi cần cái token truyền lên kèm theo => 100 cái api => 100 cái token kèm theo => sử dụng `orh.yaml`

nó như cái swagger => biến nó thành 1 cái sdk để sử dụng

=> lên gpt viết `help me gene oas.yaml for api request ` => ném cái url của vndirect vào => ném cái reponse mẫu trả về

dán file generate trong utils vào => cài thư viện để genearete từ cái yml sang sdk

```bash
 npm i @openapitools/openapi-generator-cli
```

có 1 file là `openapitools.json`

chạy => codegen => tự tạo cái generated trong client => khi đó khi gọi api ko cần cái vndirect-service nữa => đã xử lí đươc interface bên yml => build được sdk rồi

config thêm 1 cái wrapper axios nữa để call api

ý tưởng sẽ là

vndirect.config({url:....,token:...}) => gọi vndirect.getStock => làm code gọn hơn chứ ko nhanh hơn là mấy

=> file `providers.ts`

=> viết file `vndirect-client.module.ts` => service => sửa lại cái interface ở cái `stock-processor.service`
