import { Injectable, NestMiddleware, Inject, Get, Ip } from '@nestjs/common';
import { UserAgent } from './user-agent.entity';

export const uniqueId = (length = 13) => {
  var nanoId = require('nano-id');
  return nanoId(length);
};

@Injectable()
export class UserAgentMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    const { ip, method, originalUrl } = req;
    const newData = {
      uuid: uniqueId(),
      ip: ip,
      user_agent: req.headers['user-agent'],
    };
    const data = await UserAgent.findOne({
      where: { ip: ip },
    }).then(async (user) => {
      if (user) {
        await UserAgent.update(
          { user_agent: req.headers['user-agent'], ip: ip },
          { where: { id: user.id } },
        );
        req.userAgentId = user?.id;
        req.userAgentIp = user?.ip;
      } else {
        await UserAgent.create(newData)
          .then((user) => {
            req.userAgentId = user?.id;
            req.userAgentIp = user?.ip;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
    next();
  }
}
