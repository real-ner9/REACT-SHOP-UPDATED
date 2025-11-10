import { registerAs } from '@nestjs/config';

export interface AppConfiguration {
  port: number;
}

export default registerAs('app', (): AppConfiguration => {
  return {
    port: Number.parseInt(process.env.PORT ?? '3000', 10),
  };
});
