export const VERSION: string;

export interface RollupError extends RollupLogProps {
	parserError?: Error;
	stack?: string;
	watchFiles?: string[];
}

export interface RollupWarning extends RollupLogProps {
	chunkName?: string;
	cycle?: string[];
	exporter?: string;
	exportName?: string;
	guess?: string;
	importer?: string;
	missing?: string;
	modules?: string[];
	names?: string[];
	reexporter?: string;
	source?: string;
	sources?: string[];
}

export interface RollupLogProps {
	code?: string;
	frame?: string;
	hook?: string;
	id?: string;
	loc?: {
		column: number;
		file?: string;
		line: number;
	};
	message: string;
	name?: string;
	plugin?: string;
	pluginCode?: string;
	pos?: number;
	url?: string;
}

export type SourceMapSegment =
	| [number]
	| [number, number, number, number]
	| [number, number, number, number, number];

export interface ExistingDecodedSourceMap {
	file?: string;
	mappings: SourceMapSegment[][];
	names: string[];
	sourceRoot?: string;
	sources: string[];
	sourcesContent?: string[];
	version: number;
}

export interface ExistingRawSourceMap {
	file?: string;
	mappings: string;
	names: string[];
	sourceRoot?: string;
	sources: string[];
	sourcesContent?: string[];
	version: number;
}

export type DecodedSourceMapOrMissing =
	| {
			mappings?: never;
			missing: true;
			plugin: string;
	  }
	| ExistingDecodedSourceMap;

export interface SourceMap {
	file: string;
	mappings: string;
	names: string[];
	sources: string[];
	sourcesContent: string[];
	version: number;
	toString(): string;
	toUrl(): string;
}

export type SourceMapInput = ExistingRawSourceMap | string | null | { mappings: '' };

export interface SourceDescription {
	ast?: AcornNode;
	code: string;
	map?: SourceMapInput;
	moduleSideEffects?: boolean | null;
	syntheticNamedExports?: boolean;
}

export interface TransformModuleJSON {
	ast?: AcornNode;
	code: string;
	// note if plugins use new this.cache to opt-out auto transform cache
	customTransformCache: boolean;
	moduleSideEffects: boolean | null;
	originalCode: string;
	originalSourcemap: ExistingDecodedSourceMap | null;
	resolvedIds?: ResolvedIdMap;
	sourcemapChain: DecodedSourceMapOrMissing[];
	syntheticNamedExports: boolean | null;
	transformDependencies: string[];
}

export interface ModuleJSON extends TransformModuleJSON {
	alwaysRemovedCode: [number, number][];
	ast: AcornNode;
	dependencies: string[];
	id: string;
	transformFiles: EmittedFile[] | undefined;
}

export interface PluginCache {
	delete(id: string): boolean;
	get<T = any>(id: string): T;
	has(id: string): boolean;
	set<T = any>(id: string, value: T): void;
}

export interface MinimalPluginContext {
	meta: PluginContextMeta;
}

export interface EmittedAsset {
	fileName?: string;
	name?: string;
	source?: string | Uint8Array;
	type: 'asset';
}

export interface EmittedChunk {
	fileName?: string;
	id: string;
	importer?: string;
	name?: string;
	preserveSignature?: PreserveEntrySignaturesOption;
	type: 'chunk';
}

export type EmittedFile = EmittedAsset | EmittedChunk;

export type EmitAsset = (name: string, source?: string | Uint8Array) => string;

export type EmitChunk = (id: string, options?: { name?: string }) => string;

export type EmitFile = (emittedFile: EmittedFile) => string;

export interface PluginContext extends MinimalPluginContext {
	addWatchFile: (id: string) => void;
	cache: PluginCache;
	/** @deprecated Use `this.emitFile` instead */
	emitAsset: EmitAsset;
	/** @deprecated Use `this.emitFile` instead */
	emitChunk: EmitChunk;
	emitFile: EmitFile;
	error: (err: RollupError | string, pos?: number | { column: number; line: number }) => never;
	/** @deprecated Use `this.getFileName` instead */
	getAssetFileName: (assetReferenceId: string) => string;
	/** @deprecated Use `this.getFileName` instead */
	getChunkFileName: (chunkReferenceId: string) => string;
	getFileName: (fileReferenceId: string) => string;
	getModuleInfo: (
		moduleId: string
	) => {
		dynamicallyImportedIds: string[];
		hasModuleSideEffects: boolean;
		id: string;
		importedIds: string[];
		isEntry: boolean;
		isExternal: boolean;
	};
	/** @deprecated Use `this.resolve` instead */
	isExternal: IsExternal;
	moduleIds: IterableIterator<string>;
	parse: (input: string, options: any) => AcornNode;
	resolve: (
		source: string,
		importer?: string,
		options?: { skipSelf: boolean }
	) => Promise<ResolvedId | null>;
	/** @deprecated Use `this.resolve` instead */
	resolveId: (source: string, importer?: string) => Promise<string | null>;
	setAssetSource: (assetReferenceId: string, source: string | Uint8Array) => void;
	warn: (warning: RollupWarning | string, pos?: number | { column: number; line: number }) => void;
}

export interface PluginContextMeta {
	rollupVersion: string;
}

export interface ResolvedId {
	external: boolean;
	id: string;
	moduleSideEffects: boolean;
	syntheticNamedExports: boolean;
}

export interface ResolvedIdMap {
	[key: string]: ResolvedId;
}

interface PartialResolvedId {
	external?: boolean;
	id: string;
	moduleSideEffects?: boolean | null;
	syntheticNamedExports?: boolean;
}

export type ResolveIdResult = string | false | null | undefined | PartialResolvedId;

export type ResolveIdHook = (
	this: PluginContext,
	source: string,
	importer: string | undefined
) => Promise<ResolveIdResult> | ResolveIdResult;

export type IsExternal = (
	source: string,
	importer: string | undefined,
	isResolved: boolean
) => boolean | null | undefined;

export type IsPureModule = (id: string) => boolean | null | undefined;

export type HasModuleSideEffects = (id: string, external: boolean) => boolean;

type LoadResult = SourceDescription | string | null | undefined;

export type LoadHook = (this: PluginContext, id: string) => Promise<LoadResult> | LoadResult;

export interface TransformPluginContext extends PluginContext {
	getCombinedSourcemap: () => SourceMap;
}

export type TransformResult = string | null | undefined | SourceDescription;

export type TransformHook = (
	this: TransformPluginContext,
	code: string,
	id: string
) => Promise<TransformResult> | TransformResult;

export type RenderChunkHook = (
	this: PluginContext,
	code: string,
	chunk: RenderedChunk,
	options: OutputOptions
) =>
	| Promise<{ code: string; map?: SourceMapInput } | null>
	| { code: string; map?: SourceMapInput }
	| string
	| null;

export type ResolveDynamicImportHook = (
	this: PluginContext,
	specifier: string | AcornNode,
	importer: string
) => Promise<ResolveIdResult> | ResolveIdResult;

export type ResolveImportMetaHook = (
	this: PluginContext,
	prop: string | null,
	options: { chunkId: string; format: InternalModuleFormat; moduleId: string }
) => string | null | undefined;

export type ResolveAssetUrlHook = (
	this: PluginContext,
	options: {
		assetFileName: string;
		chunkId: string;
		format: InternalModuleFormat;
		moduleId: string;
		relativeAssetPath: string;
	}
) => string | null | undefined;

export type ResolveFileUrlHook = (
	this: PluginContext,
	options: {
		assetReferenceId: string | null;
		chunkId: string;
		chunkReferenceId: string | null;
		fileName: string;
		format: InternalModuleFormat;
		moduleId: string;
		referenceId: string;
		relativePath: string;
	}
) => string | null | undefined;

export type AddonHookFunction = (this: PluginContext) => string | Promise<string>;
export type AddonHook = string | AddonHookFunction;

/**
 * use this type for plugin annotation
 * @example
 * ```ts
 * interface Options {
 * ...
 * }
 * const myPlugin: PluginImpl<Options> = (options = {}) => { ... }
 * ```
 */
export type PluginImpl<O extends object = object> = (options?: O) => Plugin;

export interface OutputBundle {
	[fileName: string]: OutputAsset | OutputChunk;
}

export interface FilePlaceholder {
	type: 'placeholder';
}

export interface OutputBundleWithPlaceholders {
	[fileName: string]: OutputAsset | OutputChunk | FilePlaceholder;
}

export interface PluginHooks extends OutputPluginHooks {
	buildEnd: (this: PluginContext, err?: Error) => Promise<void> | void;
	buildStart: (this: PluginContext, options: InputOptions) => Promise<void> | void;
	load: LoadHook;
	options: (this: MinimalPluginContext, options: InputOptions) => InputOptions | null | undefined;
	resolveDynamicImport: ResolveDynamicImportHook;
	resolveId: ResolveIdHook;
	transform: TransformHook;
	watchChange: (id: string) => void;
}

interface OutputPluginHooks {
	augmentChunkHash: (this: PluginContext, chunk: PreRenderedChunk) => string | void;
	generateBundle: (
		this: PluginContext,
		options: OutputOptions,
		bundle: OutputBundle,
		isWrite: boolean
	) => void | Promise<void>;
	outputOptions: (this: PluginContext, options: OutputOptions) => OutputOptions | null | undefined;
	renderChunk: RenderChunkHook;
	renderDynamicImport: (
		this: PluginContext,
		options: {
			customResolution: string | null;
			format: InternalModuleFormat;
			moduleId: string;
			targetModuleId: string | null;
		}
	) => { left: string; right: string } | null | undefined;
	renderError: (this: PluginContext, err?: Error) => Promise<void> | void;
	renderStart: (
		this: PluginContext,
		outputOptions: OutputOptions,
		inputOptions: InputOptions
	) => Promise<void> | void;
	/** @deprecated Use `resolveFileUrl` instead */
	resolveAssetUrl: ResolveAssetUrlHook;
	resolveFileUrl: ResolveFileUrlHook;
	resolveImportMeta: ResolveImportMetaHook;
	writeBundle: (
		this: PluginContext,
		options: OutputOptions,
		bundle: OutputBundle
	) => void | Promise<void>;
}

export type AsyncPluginHooks =
	| 'buildEnd'
	| 'buildStart'
	| 'generateBundle'
	| 'load'
	| 'renderChunk'
	| 'renderError'
	| 'renderStart'
	| 'resolveDynamicImport'
	| 'resolveId'
	| 'transform'
	| 'writeBundle';

export type PluginValueHooks = 'banner' | 'footer' | 'intro' | 'outro';

export type SyncPluginHooks = Exclude<keyof PluginHooks, AsyncPluginHooks>;

export type FirstPluginHooks =
	| 'load'
	| 'renderDynamicImport'
	| 'resolveAssetUrl'
	| 'resolveDynamicImport'
	| 'resolveFileUrl'
	| 'resolveId'
	| 'resolveImportMeta';

export type SequentialPluginHooks =
	| 'augmentChunkHash'
	| 'generateBundle'
	| 'options'
	| 'outputOptions'
	| 'renderChunk'
	| 'transform'
	| 'watchChange';

export type ParallelPluginHooks =
	| 'banner'
	| 'buildEnd'
	| 'buildStart'
	| 'footer'
	| 'intro'
	| 'outro'
	| 'renderError'
	| 'renderStart'
	| 'writeBundle';

interface OutputPluginValueHooks {
	banner: AddonHook;
	cacheKey: string;
	footer: AddonHook;
	intro: AddonHook;
	outro: AddonHook;
}

export interface Plugin extends Partial<PluginHooks>, Partial<OutputPluginValueHooks> {
	name: string;
}

export interface OutputPlugin extends Partial<OutputPluginHooks>, Partial<OutputPluginValueHooks> {
	name: string;
}

export interface TreeshakingOptions {
	annotations?: boolean;
	moduleSideEffects?: ModuleSideEffectsOption;
	propertyReadSideEffects?: boolean;
	/** @deprecated Use `moduleSideEffects` instead */
	pureExternalModules?: PureModulesOption;
	tryCatchDeoptimization?: boolean;
	unknownGlobalSideEffects?: boolean;
}

export type GetManualChunk = (id: string) => string | null | undefined;

export type ExternalOption = (string | RegExp)[] | string | RegExp | IsExternal;
export type PureModulesOption = boolean | string[] | IsPureModule;
export type GlobalsOption = { [name: string]: string } | ((name: string) => string);
export type InputOption = string | string[] | { [entryAlias: string]: string };
export type ManualChunksOption = { [chunkAlias: string]: string[] } | GetManualChunk;
export type ModuleSideEffectsOption = boolean | 'no-external' | string[] | HasModuleSideEffects;
export type PreserveEntrySignaturesOption = false | 'strict' | 'allow-extension';

export interface InputOptions {
	acorn?: any;//任何应该传递给Acorn的选项，例如allowReserved：true。
    acornInjectPlugins?: Function | Function[];
    //Object 以前生成的包。使用它来加速后续的构建——Rollup只会重新分析已经更改的模块。
	cache?: false | RollupCache;
	context?: string;//默认情况下，模块的上下文 - 即顶级的this的值为undefined。在极少数情况下，您可能需要将其更改为其他内容，如 'window'。
	experimentalCacheExpiry?: number;//确定在运行了多少次后不再应使用插件的缓存资产。
	external?: ExternalOption;
	inlineDynamicImports?: boolean;//这将内联动态导入，而不是创建新的块来创建单个包。仅当提供单个输入时才可能。
	input?: InputOption;//String 这个包的入口点 (例如：你的 main.js 或者 app.js 或者 index.js)
	manualChunks?: ManualChunksOption;//允许创建自定义共享公共块。当使用对象形式时，每个属性代表一个块，该块包含列出的模块及其所有依赖关系（如果它们是模块图的一部分），除非它们已经在另一个手动块中。块的名称将由属性键确定。
	moduleContext?: ((id: string) => string) | { [id: string]: string };//和options.context一样，但是每个模块可以是id: context对的对象，也可以是id => context函数。
	onwarn?: WarningHandlerWithDefault;//Function 将拦截警告信息。如果没有提供，警告将被复制并打印到控制台。
	perf?: boolean;//是否收集性能计时
	plugins?: Plugin[];
	preserveEntrySignatures?: PreserveEntrySignaturesOption;
	preserveModules?: boolean;
	preserveSymlinks?: boolean;
	shimMissingExports?: boolean;
	strictDeprecations?: boolean;
	treeshake?: boolean | TreeshakingOptions;//是否应用tree-shaking。建议您省略此选项（默认为treeshake：true），除非您发现由tree-shaking算法引起的bug，在这种情况下，请使用“treeshake：false”，一旦您提交了问题！
	watch?: WatcherOptions;
}

/*
amd –异步模块定义，与RequireJS等模块加载器一起使用
cjs- CommonJS的，适用于节点和其他捆扎机（别名：commonjs）
es–将捆绑软件保留为ES模块文件，适用于其他捆绑软件，并作为<script type=module>标签包含在现代浏览器中（别名：esm，module）
iife–一种自执行功能，适合作为<script>标记包含在内。（如果要为应用程序创建捆绑包，则可能要使用它。）
umd-通用模块定义，工作方式amd，cjs以及iife所有在一个
system-在SystemJS装载机的原生格式（别名：systemjs）
*/
export type InternalModuleFormat = 'amd' | 'cjs' | 'es' | 'iife' | 'system' | 'umd';

export type ModuleFormat = InternalModuleFormat | 'commonjs' | 'esm' | 'module' | 'systemjs';

export type OptionsPaths = Record<string, string> | ((id: string) => string);

export interface OutputOptions {
	amd?: {
		define?: string;
		id?: string;
	};
    assetFileNames?: string;
	banner?: string | (() => string | Promise<string>);    //String 字符串以 前置/追加 到文件束(bundle)。(注意:“banner”和“footer”选项不会破坏sourcemaps)
	/**
	 * output.chunkFileNames
	类型：string
	CLI：--chunkFileNames <pattern>
	默认："[name]-[hash].js"
	用于命名代码拆分时创建的共享块的模式。模式支持以下占位符：
	[format]：在输出选项中定义的渲染格式，例如es或cjs。
	[hash]：基于块的内容及其所有依赖项的内容的哈希。
	[name]：块的名称。这可以通过manualChunks选项显式设置，也可以通过插件通过创建块来进行设置this.emitFile。否则，它将从块内容派生。
	正斜杠/可用于将文件放置在子目录中。又见output.assetFileNames，output.entryFileNames。
	*/
	chunkFileNames?: string;
	compact?: boolean;//这将最小化由汇总生成的包装器代码。请注意，这不会影响用户编写的代码。捆绑预缩小的代码时，此选项很有用。
	// only required for bundle.write
	dir?: string;//所有生成的块所在的目录。如果生成多个块，则需要此选项。否则，file可以使用该选项。
	/** @deprecated Use the "renderDynamicImport" plugin hook instead. */
	dynamicImportFunction?: string;
	/**
	 * output.entryFileNames
	类型：string
	CLI：--entryFileNames <pattern>
	默认："[name].js"
	用于从入口点创建的块的模式。模式支持以下占位符：
	[format]：在输出选项中定义的渲染格式，例如es或cjs。
	[hash]：基于入口点的内容及其所有依赖项的内容的哈希。
	[name]：入口点的文件名（不带扩展名），除非使用输入的对象形式定义了另一个名称。
	正斜杠/可用于将文件放置在子目录中。又见output.assetFileNames，output.chunkFileNames。
	使用该preserveModules选项时也将使用此模式。不过，这里有一组不同的占位符：
	[format]：在输出选项中定义的呈现格式。
	[name]：文件的文件名（不带扩展名）。
	[ext]：文件的扩展名。
	[extname]：文件扩展名，.如果不为空则以前缀。
	输出扩展
	*/
	entryFileNames?: string;
	esModule?: boolean;//_esModule: true为非ES格式生成导出时是否添加属性。
	/*
	使用哪种导出模式。默认为auto，根据input模块导出的内容猜测您的意图：
	default –如果仅使用导出一件事，则适用 export default ...
	named –如果您要出口一件以上的东西，则适合
	none –适用于不导出任何内容的情况（例如，您正在构建应用程序而不是库）
	default和之间的差异named会影响其他人如何消费您的捆绑包。如果使用default，则CommonJS用户可以执行此操作，例如：
	*/
	exports?: 'default' | 'named' | 'none' | 'auto';
	extend?: boolean;//是否扩展name选项以umd或iife格式定义的全局变量。何时true，全局变量将定义为(global.name = global.name || {})。如果为false，则由定义的全局变量name将被覆盖(global.name = {})。
	externalLiveBindings?: boolean;
	// only required for bundle.write
	file?: string;
	footer?: string | (() => string | Promise<string>);
	format?: ModuleFormat;
	freeze?: boolean;
	globals?: GlobalsOption;//id: variableName在umd/ iife包中指定外部导入所需的对。例如，在这种情况下...
	hoistTransitiveImports?: boolean;
	indent?: boolean;
    interop?: boolean;//Boolean 是否添加'interop块'。默认情况下（interop：true），为了安全起见，如果需要区分默认和命名导出，则Rollup会将任何外部依赖项“default”导出到一个单独的变量。这通常只适用于您的外部依赖关系（例如与Babel）（如果您确定不需要它），则可以使用“interop：false”来节省几个字节。  
	intro?: string | (() => string | Promise<string>);//String类似于 banner和footer，除了代码在内部任何特定格式的包装器(wrapper)
	minifyInternalExports?: boolean;
	name?: string;// 使用umd或iife
	namespaceToStringTag?: boolean;
	noConflict?: boolean;
	outro?: string | (() => string | Promise<string>);
	paths?: OptionsPaths;// 路径映射
	plugins?: OutputPlugin[];// 输出插件，使用于某个输出的插件
	preferConst?: boolean;
	sourcemap?: boolean | 'inline' | 'hidden';//如果 true，将创建一个单独的sourcemap文件。如果 inline，sourcemap将作为数据URI附加到生成的output文
	sourcemapExcludeSources?: boolean;
	sourcemapFile?: string;
	sourcemapPathTransform?: (sourcePath: string) => string;
	strict?: boolean;
}

export type WarningHandlerWithDefault = (
	warning: RollupWarning,
	defaultHandler: WarningHandler
) => void;
export type WarningHandler = (warning: RollupWarning) => void;

export interface SerializedTimings {
	[label: string]: [number, number, number];
}

export interface OutputAsset {
	fileName: string;
	/** @deprecated Accessing "isAsset" on files in the bundle is deprecated, please use "type === \'asset\'" instead */
	isAsset: true;
	source: string | Uint8Array;
	type: 'asset';
}

export interface RenderedModule {
	originalLength: number;
	removedExports: string[];
	renderedExports: string[];
	renderedLength: number;
}

export interface PreRenderedChunk {
	dynamicImports: string[];
	exports: string[];
	facadeModuleId: string | null;
	imports: string[];
	isDynamicEntry: boolean;
	isEntry: boolean;
	modules: {
		[id: string]: RenderedModule;
	};
	name: string;
}

export interface RenderedChunk extends PreRenderedChunk {
	fileName: string;
}

export interface OutputChunk extends RenderedChunk {
	code: string;
	map?: SourceMap;
	type: 'chunk';
}

export interface SerializablePluginCache {
	[key: string]: [number, any];
}

export interface RollupCache {
	modules: ModuleJSON[];
	plugins?: Record<string, SerializablePluginCache>;
}

export interface RollupOutput {
	output: [OutputChunk, ...(OutputChunk | OutputAsset)[]];
}

export interface RollupBuild {
	cache: RollupCache;
	generate: (outputOptions: OutputOptions) => Promise<RollupOutput>;
	getTimings?: () => SerializedTimings;
	watchFiles: string[];
	write: (options: OutputOptions) => Promise<RollupOutput>;
}

export interface RollupOptions extends InputOptions {
	// This is included for compatibility with config files but ignored by rollup.rollup
	output?: OutputOptions | OutputOptions[];
}

export interface MergedRollupOptions extends InputOptions {
	output: OutputOptions[];
}

export function rollup(options: RollupOptions): Promise<RollupBuild>;

export interface ChokidarOptions {
	alwaysStat?: boolean;
	atomic?: boolean | number;
	awaitWriteFinish?:
		| {
				pollInterval?: number;
				stabilityThreshold?: number;
		  }
		| boolean;
	binaryInterval?: number;
	cwd?: string;
	depth?: number;
	disableGlobbing?: boolean;
	followSymlinks?: boolean;
	ignored?: any;
	ignoreInitial?: boolean;
	ignorePermissionErrors?: boolean;
	interval?: number;
	persistent?: boolean;
	useFsEvents?: boolean;
	usePolling?: boolean;
}

export interface WatcherOptions {
	chokidar?: ChokidarOptions;
	clearScreen?: boolean;
	exclude?: string[];
	include?: string[];
	skipWrite?: boolean;
}

export interface RollupWatchOptions extends InputOptions {
	output?: OutputOptions | OutputOptions[];
	watch?: WatcherOptions;
}

interface TypedEventEmitter<T> {
	addListener<K extends keyof T>(event: K, listener: T[K]): this;
	emit<K extends keyof T>(event: K, ...args: any[]): boolean;
	eventNames(): Array<keyof T>;
	getMaxListeners(): number;
	listenerCount(type: keyof T): number;
	listeners<K extends keyof T>(event: K): Array<T[K]>;
	off<K extends keyof T>(event: K, listener: T[K]): this;
	on<K extends keyof T>(event: K, listener: T[K]): this;
	once<K extends keyof T>(event: K, listener: T[K]): this;
	prependListener<K extends keyof T>(event: K, listener: T[K]): this;
	prependOnceListener<K extends keyof T>(event: K, listener: T[K]): this;
	rawListeners<K extends keyof T>(event: K): Array<T[K]>;
	removeAllListeners<K extends keyof T>(event?: K): this;
	removeListener<K extends keyof T>(event: K, listener: T[K]): this;
	setMaxListeners(n: number): this;
}

export type RollupWatcherEvent =
	| { code: 'START' }
	| { code: 'BUNDLE_START'; input: InputOption; output: readonly string[] }
	| {
			code: 'BUNDLE_END';
			duration: number;
			input: InputOption;
			output: readonly string[];
			result: RollupBuild;
	  }
	| { code: 'END' }
	| { code: 'ERROR'; error: RollupError };

export interface RollupWatcher
	extends TypedEventEmitter<{
		change: (id: string) => void;
		event: (event: RollupWatcherEvent) => void;
		restart: () => void;
	}> {
	close(): void;
}

export function watch(config: RollupWatchOptions | RollupWatchOptions[]): RollupWatcher;

interface AcornNode {
	end: number;
	start: number;
	type: string;
}
