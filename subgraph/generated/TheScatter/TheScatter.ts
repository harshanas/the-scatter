// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class PostCreated extends ethereum.Event {
  get params(): PostCreated__Params {
    return new PostCreated__Params(this);
  }
}

export class PostCreated__Params {
  _event: PostCreated;

  constructor(event: PostCreated) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get title(): string {
    return this._event.parameters[1].value.toString();
  }

  get hash(): string {
    return this._event.parameters[2].value.toString();
  }

  get author(): Address {
    return this._event.parameters[3].value.toAddress();
  }
}

export class PostUpdated extends ethereum.Event {
  get params(): PostUpdated__Params {
    return new PostUpdated__Params(this);
  }
}

export class PostUpdated__Params {
  _event: PostUpdated;

  constructor(event: PostUpdated) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get title(): string {
    return this._event.parameters[1].value.toString();
  }

  get hash(): string {
    return this._event.parameters[2].value.toString();
  }

  get isPublished(): boolean {
    return this._event.parameters[3].value.toBoolean();
  }
}

export class TheScatter__fetchStoriesResultValue0Struct extends ethereum.Tuple {
  get id(): BigInt {
    return this[0].toBigInt();
  }

  get title(): string {
    return this[1].toString();
  }

  get content(): string {
    return this[2].toString();
  }

  get isPublished(): boolean {
    return this[3].toBoolean();
  }

  get createdAt(): BigInt {
    return this[4].toBigInt();
  }

  get updatedAt(): BigInt {
    return this[5].toBigInt();
  }
}

export class TheScatter__fetchStoryResultValue0Struct extends ethereum.Tuple {
  get id(): BigInt {
    return this[0].toBigInt();
  }

  get title(): string {
    return this[1].toString();
  }

  get content(): string {
    return this[2].toString();
  }

  get isPublished(): boolean {
    return this[3].toBoolean();
  }

  get createdAt(): BigInt {
    return this[4].toBigInt();
  }

  get updatedAt(): BigInt {
    return this[5].toBigInt();
  }
}

export class TheScatter extends ethereum.SmartContract {
  static bind(address: Address): TheScatter {
    return new TheScatter("TheScatter", address);
  }

  authorsCount(): BigInt {
    let result = super.call("authorsCount", "authorsCount():(uint256)", []);

    return result[0].toBigInt();
  }

  try_authorsCount(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("authorsCount", "authorsCount():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  fetchStories(
    walletAddr: Address
  ): Array<TheScatter__fetchStoriesResultValue0Struct> {
    let result = super.call(
      "fetchStories",
      "fetchStories(address):((uint256,string,string,bool,uint256,uint256)[])",
      [ethereum.Value.fromAddress(walletAddr)]
    );

    return result[0].toTupleArray<TheScatter__fetchStoriesResultValue0Struct>();
  }

  try_fetchStories(
    walletAddr: Address
  ): ethereum.CallResult<Array<TheScatter__fetchStoriesResultValue0Struct>> {
    let result = super.tryCall(
      "fetchStories",
      "fetchStories(address):((uint256,string,string,bool,uint256,uint256)[])",
      [ethereum.Value.fromAddress(walletAddr)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      value[0].toTupleArray<TheScatter__fetchStoriesResultValue0Struct>()
    );
  }

  fetchStory(
    walletAddr: Address,
    storyId: BigInt
  ): TheScatter__fetchStoryResultValue0Struct {
    let result = super.call(
      "fetchStory",
      "fetchStory(address,uint256):((uint256,string,string,bool,uint256,uint256))",
      [
        ethereum.Value.fromAddress(walletAddr),
        ethereum.Value.fromUnsignedBigInt(storyId)
      ]
    );

    return changetype<TheScatter__fetchStoryResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_fetchStory(
    walletAddr: Address,
    storyId: BigInt
  ): ethereum.CallResult<TheScatter__fetchStoryResultValue0Struct> {
    let result = super.tryCall(
      "fetchStory",
      "fetchStory(address,uint256):((uint256,string,string,bool,uint256,uint256))",
      [
        ethereum.Value.fromAddress(walletAddr),
        ethereum.Value.fromUnsignedBigInt(storyId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<TheScatter__fetchStoryResultValue0Struct>(value[0].toTuple())
    );
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  storiesCount(): BigInt {
    let result = super.call("storiesCount", "storiesCount():(uint256)", []);

    return result[0].toBigInt();
  }

  try_storiesCount(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("storiesCount", "storiesCount():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class CreateStoryCall extends ethereum.Call {
  get inputs(): CreateStoryCall__Inputs {
    return new CreateStoryCall__Inputs(this);
  }

  get outputs(): CreateStoryCall__Outputs {
    return new CreateStoryCall__Outputs(this);
  }
}

export class CreateStoryCall__Inputs {
  _call: CreateStoryCall;

  constructor(call: CreateStoryCall) {
    this._call = call;
  }

  get title(): string {
    return this._call.inputValues[0].value.toString();
  }

  get hash(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class CreateStoryCall__Outputs {
  _call: CreateStoryCall;

  constructor(call: CreateStoryCall) {
    this._call = call;
  }
}

export class UpdateStoryCall extends ethereum.Call {
  get inputs(): UpdateStoryCall__Inputs {
    return new UpdateStoryCall__Inputs(this);
  }

  get outputs(): UpdateStoryCall__Outputs {
    return new UpdateStoryCall__Outputs(this);
  }
}

export class UpdateStoryCall__Inputs {
  _call: UpdateStoryCall;

  constructor(call: UpdateStoryCall) {
    this._call = call;
  }

  get storyId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get title(): string {
    return this._call.inputValues[1].value.toString();
  }

  get hash(): string {
    return this._call.inputValues[2].value.toString();
  }

  get isPublished(): boolean {
    return this._call.inputValues[3].value.toBoolean();
  }
}

export class UpdateStoryCall__Outputs {
  _call: UpdateStoryCall;

  constructor(call: UpdateStoryCall) {
    this._call = call;
  }
}
