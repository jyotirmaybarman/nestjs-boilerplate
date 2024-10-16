export function Job(): MethodDecorator {
  return (target, propertyKey, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      if (args[0].payload) {
        args[0] = args[0].payload;
      }
      return originalMethod.apply(this, args);
    };
  };
}
