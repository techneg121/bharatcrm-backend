"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealsController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const jwt_guard_1 = require("../auth/jwt.guard");
const create_deal_dto_1 = require("./dto/create-deal.dto");
const update_deal_dto_1 = require("./dto/update-deal.dto");
const deals_service_1 = require("./deals.service");
let DealsController = class DealsController {
    dealsService;
    constructor(dealsService) {
        this.dealsService = dealsService;
    }
    getUserId(req) {
        return req.user?.sub ?? req.user?.id;
    }
    create(req, dto) {
        return this.dealsService.create(req.user.orgId, this.getUserId(req), dto);
    }
    findAll(req, page = '1', limit = '20', q, stage) {
        return this.dealsService.findAll(req.user.orgId, Number(page), Number(limit), q, stage);
    }
    findOne(id, req) {
        return this.dealsService.findOne(id, req.user.orgId);
    }
    update(id, req, dto) {
        return this.dealsService.update(id, req.user.orgId, dto);
    }
    remove(id, req) {
        return this.dealsService.remove(id, req.user.orgId);
    }
};
exports.DealsController = DealsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_deal_dto_1.CreateDealDto]),
    __metadata("design:returntype", void 0)
], DealsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('q')),
    __param(4, (0, common_1.Query)('stage')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, String, String]),
    __metadata("design:returntype", void 0)
], DealsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DealsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_deal_dto_1.UpdateDealDto]),
    __metadata("design:returntype", void 0)
], DealsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DealsController.prototype, "remove", null);
exports.DealsController = DealsController = __decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('deals'),
    __metadata("design:paramtypes", [deals_service_1.DealsService])
], DealsController);
//# sourceMappingURL=deals.controller.js.map