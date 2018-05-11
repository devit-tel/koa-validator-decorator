# koa-validator-decorator
koa-validator-decorator is a ES6 validator decorator by using validator core from yup

## Install
```
yarn add @spksoft/koa-validator-decorator
```

## Usage
```
import {
  HttpMethod,
  route,
} from '@spksoft/koa-decorator';
import yup from 'yup'
import validate from '@spksoft/koa-validator-decorator'

@route('/v1/hello-world')
export default class HelloWorldController{

  @route('/', HttpMethod.POST)
  @validate({
    body: yup.object().shape({
      name: yup.number().required(),
    }),
  })
  async main(ctx) {
    ctx.body = {
      'hello': 'world'
    };
  }
}

```